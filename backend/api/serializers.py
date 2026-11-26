import json

from rest_framework import serializers

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


def normalize_url(value):
    """Store links as absolute URLs so the site never has to guess."""
    value = (value or "").strip()
    if not value:
        return ""
    if value.startswith(("http://", "https://", "mailto:", "tel:")):
        return value
    return "https://" + value.lstrip("/")


class FlagField(serializers.BooleanField):
    """Boolean that keeps the model default when a multipart form omits it
    (DRF would otherwise treat a missing form value as False)."""

    default_empty_html = serializers.empty


class UrlField(serializers.CharField):
    def __init__(self, **kwargs):
        kwargs.setdefault("required", False)
        kwargs.setdefault("allow_blank", True)
        super().__init__(**kwargs)

    def to_internal_value(self, data):
        return normalize_url(super().to_internal_value(data))


class TagsField(serializers.Field):
    """Accepts a list, a JSON string, or a comma separated string (multipart forms)."""

    def to_internal_value(self, data):
        if isinstance(data, str):
            data = data.strip()
            if data.startswith("["):
                try:
                    data = json.loads(data)
                except ValueError:
                    raise serializers.ValidationError("Tags must be a list or comma separated text.")
            else:
                data = [t for t in data.split(",")]
        if not isinstance(data, list):
            raise serializers.ValidationError("Tags must be a list or comma separated text.")
        return [str(t).strip() for t in data if str(t).strip()][:8]

    def to_representation(self, value):
        return value or []


class ImageMixin(serializers.ModelSerializer):
    """Resolves an uploaded file (preferred) or a URL/path into one `*_src` string."""

    image_field = "image"
    url_field = "image_url"

    def _src(self, obj):
        f = getattr(obj, self.image_field, None)
        if f:
            request = self.context.get("request")
            try:
                url = f.url
            except ValueError:
                url = ""
            if url:
                return request.build_absolute_uri(url) if request and url.startswith("/") else url
        return getattr(obj, self.url_field, "") or ""

    def update(self, instance, validated_data):
        if self.initial_data.get("clear_image") in (True, "true", "True", "1", 1):
            f = getattr(instance, self.image_field, None)
            if f:
                f.delete(save=False)
            setattr(instance, self.image_field, None)
        return super().update(instance, validated_data)


class ProjectSerializer(ImageMixin):
    tags = TagsField(required=False)
    figma_link = UrlField()
    behance_link = UrlField()
    website_link = UrlField()
    featured = FlagField(required=False)
    published = FlagField(required=False)
    image = serializers.ImageField(required=False, allow_null=True, write_only=True)
    image_src = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "name", "category", "description", "tags", "image", "image_url", "image_src",
            "color", "figma_link", "behance_link", "website_link", "featured", "published", "order",
        ]

    def get_image_src(self, obj):
        return self._src(obj)


class ReviewSerializer(ImageMixin):
    image_field = "avatar"
    url_field = "avatar_url"
    published = FlagField(required=False)
    avatar = serializers.ImageField(required=False, allow_null=True, write_only=True)
    avatar_src = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id", "name", "position", "company", "review", "rating",
            "avatar", "avatar_url", "avatar_src", "published", "order",
        ]

    def get_avatar_src(self, obj):
        return self._src(obj)


class ToolSerializer(ImageMixin):
    image_field = "icon"
    url_field = "icon_url"
    icon = serializers.ImageField(required=False, allow_null=True, write_only=True)
    icon_src = serializers.SerializerMethodField()

    class Meta:
        model = Tool
        fields = ["id", "name", "level", "icon", "icon_url", "icon_src", "order"]

    def get_icon_src(self, obj):
        return self._src(obj)


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]


class SocialLinkSerializer(serializers.ModelSerializer):
    url = UrlField(required=True, allow_blank=False)

    class Meta:
        model = SocialLink
        fields = ["id", "platform", "label", "url", "order"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["id", "title", "period", "description", "order"]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["id", "title", "period", "description", "order"]


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        exclude = ["id"]


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "id", "name", "email", "phone", "interest", "budget",
            "country", "details", "is_read", "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class ContactSerializer(serializers.ModelSerializer):
    """Public form. `website` is a honeypot that real visitors never fill."""

    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Message
        fields = ["name", "email", "phone", "interest", "budget", "country", "details", "website"]
        extra_kwargs = {"details": {"max_length": 5000}}

    def validate_name(self, v):
        v = v.strip()
        if len(v) < 2:
            raise serializers.ValidationError("Enter your name.")
        return v

    def validate_details(self, v):
        v = v.strip()
        if len(v) < 10:
            raise serializers.ValidationError("Tell me a little more about the project (10+ characters).")
        return v
