from django.contrib.auth import authenticate
from django.db import transaction
from django.db.models import F
from rest_framework import mixins, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import (
    FAQ,
    Education,
    Experience,
    Message,
    Project,
    Review,
    SiteProfile,
    SocialLink,
    Tool,
)
from .serializers import (
    ContactSerializer,
    EducationSerializer,
    ExperienceSerializer,
    FAQSerializer,
    MessageSerializer,
    ProjectSerializer,
    ReviewSerializer,
    SiteProfileSerializer,
    SocialLinkSerializer,
    ToolSerializer,
)
from .notify import notify_new_message


class ContactThrottle(AnonRateThrottle):
    scope = "contact"


class LoginThrottle(AnonRateThrottle):
    scope = "login"


# --------------------------------------------------------------------------
# Public
# --------------------------------------------------------------------------
class BootstrapView(APIView):
    """One request that returns everything the public site needs."""

    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        ctx = {"request": request}
        data = {
            "profile": SiteProfileSerializer(SiteProfile.load()).data,
            "socials": SocialLinkSerializer(SocialLink.objects.all(), many=True).data,
            "tools": ToolSerializer(Tool.objects.all(), many=True, context=ctx).data,
            "experience": ExperienceSerializer(Experience.objects.all(), many=True).data,
            "education": EducationSerializer(Education.objects.all(), many=True).data,
            "faqs": FAQSerializer(FAQ.objects.all(), many=True).data,
            "reviews": ReviewSerializer(Review.objects.filter(published=True), many=True, context=ctx).data,
            "projects": ProjectSerializer(Project.objects.filter(published=True), many=True, context=ctx).data,
        }
        resp = Response(data)
        resp["Cache-Control"] = "public, max-age=30, stale-while-revalidate=300"
        return resp


class ContactView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [ContactThrottle]

    def post(self, request):
        ser = ContactSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        data = dict(ser.validated_data)
        if data.pop("website", ""):
            # Honeypot filled: pretend success, store nothing.
            return Response({"ok": True}, status=status.HTTP_201_CREATED)
        msg = Message.objects.create(**data)
        notify_new_message(msg)
        return Response({"ok": True}, status=status.HTTP_201_CREATED)


# --------------------------------------------------------------------------
# Auth
# --------------------------------------------------------------------------
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [LoginThrottle]

    def post(self, request):
        user = authenticate(
            username=str(request.data.get("username", "")).strip(),
            password=str(request.data.get("password", "")),
        )
        if not user or not user.is_staff:
            return Response({"detail": "Wrong username or password."}, status=status.HTTP_400_BAD_REQUEST)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.get_username()})


class LogoutView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MeView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({"username": request.user.get_username()})


# --------------------------------------------------------------------------
# Admin CRUD
# --------------------------------------------------------------------------
class AdminViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    insert_top = False  # newest first for projects, experience, education, reviews

    def perform_create(self, serializer):
        model = serializer.Meta.model
        if self.insert_top:
            with transaction.atomic():
                model.objects.update(order=F("order") + 1)
                serializer.save(order=0)
        else:
            last = model.objects.order_by("-order").values_list("order", flat=True).first() or 0
            serializer.save(order=last + 1)

    @action(detail=False, methods=["post"])
    def reorder(self, request):
        """Body: {"ids": [3, 1, 2]} sets order to the position in that list."""
        ids = request.data.get("ids")
        if not isinstance(ids, list) or not all(isinstance(i, int) for i in ids):
            return Response({"detail": "ids must be a list of integers."}, status=400)
        qs = self.get_queryset().filter(id__in=ids)
        found = {o.id: o for o in qs}
        with transaction.atomic():
            for pos, pk in enumerate(ids, start=1):
                if pk in found:
                    found[pk].order = pos
                    found[pk].save(update_fields=["order"])
        return Response({"ok": True})


class ProjectAdmin(AdminViewSet):
    insert_top = True
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class FAQAdmin(AdminViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class SocialAdmin(AdminViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer


class ExperienceAdmin(AdminViewSet):
    insert_top = True
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationAdmin(AdminViewSet):
    insert_top = True
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ReviewAdmin(AdminViewSet):
    insert_top = True
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ToolAdmin(AdminViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer


class MessageAdmin(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAdminUser]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    http_method_names = ["get", "patch", "delete", "post", "head", "options"]

    @action(detail=False, methods=["post"], url_path="mark-all-read")
    def mark_all_read(self, request):
        Message.objects.filter(is_read=False).update(is_read=True)
        return Response({"ok": True})


class ProfileAdmin(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response(SiteProfileSerializer(SiteProfile.load()).data)

    def put(self, request):
        ser = SiteProfileSerializer(SiteProfile.load(), data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)

    patch = put


class StatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response(
            {
                "messages": Message.objects.count(),
                "unread": Message.objects.filter(is_read=False).count(),
                "projects": Project.objects.count(),
                "faqs": FAQ.objects.count(),
                "socials": SocialLink.objects.count(),
                "experience": Experience.objects.count(),
                "education": Education.objects.count(),
                "reviews": Review.objects.count(),
                "tools": Tool.objects.count(),
                "latest": MessageSerializer(Message.objects.all()[:5], many=True).data,
            }
        )
