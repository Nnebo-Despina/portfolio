import io

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.cache import cache
from django.test import override_settings
from PIL import Image
from rest_framework.test import APITestCase

from .models import FAQ, Message, Project, SocialLink


def png_bytes():
    buf = io.BytesIO()
    Image.new("RGB", (20, 20), "red").save(buf, "PNG")
    return buf.getvalue()


@override_settings(MEDIA_ROOT="/tmp/portfolio-test-media")
class ApiTests(APITestCase):
    def setUp(self):
        cache.clear()
        User = get_user_model()
        self.admin = User.objects.create_superuser("boss", "b@x.com", "pass-12345-xyz")
        self.plain = User.objects.create_user("visitor", "v@x.com", "pass-12345-xyz")

    def login(self):
        r = self.client.post("/api/auth/login/", {"username": "boss", "password": "pass-12345-xyz"}, format="json")
        self.assertEqual(r.status_code, 200, r.content)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {r.data['token']}")

    # ---- public ----------------------------------------------------------
    def test_bootstrap_is_public_and_complete(self):
        FAQ.objects.create(question="Q?", answer="A.")
        r = self.client.get("/api/bootstrap/")
        self.assertEqual(r.status_code, 200)
        for key in ["profile", "socials", "tools", "experience", "education", "faqs", "reviews", "projects"]:
            self.assertIn(key, r.data)
        self.assertEqual(len(r.data["faqs"]), 1)
        self.assertIn("max-age", r["Cache-Control"])

    def test_unpublished_projects_hidden_from_public(self):
        Project.objects.create(name="Hidden", published=False)
        Project.objects.create(name="Shown", published=True)
        names = [p["name"] for p in self.client.get("/api/bootstrap/").data["projects"]]
        self.assertEqual(names, ["Shown"])

    def test_contact_saves_message(self):
        r = self.client.post("/api/contact/", {
            "name": "Ada", "email": "ada@x.com", "details": "I need a landing page for my shop.",
            "budget": "$100 - $500", "country": "Nigeria",
        }, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertEqual(Message.objects.count(), 1)

    def test_contact_honeypot_discards(self):
        r = self.client.post("/api/contact/", {
            "name": "Bot", "email": "b@x.com", "details": "buy cheap stuff now please", "website": "spam.com",
        }, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertEqual(Message.objects.count(), 0)

    def test_contact_validates(self):
        r = self.client.post("/api/contact/", {"name": "A", "email": "nope", "details": "short"}, format="json")
        self.assertEqual(r.status_code, 400)
        self.assertEqual(Message.objects.count(), 0)

    # ---- auth ------------------------------------------------------------
    def test_admin_endpoints_need_login(self):
        for url in ["/api/admin/projects/", "/api/admin/messages/", "/api/admin/profile/", "/api/admin/stats/"]:
            self.assertEqual(self.client.get(url).status_code, 401, url)

    def test_non_staff_cannot_login(self):
        r = self.client.post("/api/auth/login/", {"username": "visitor", "password": "pass-12345-xyz"}, format="json")
        self.assertEqual(r.status_code, 400)

    def test_wrong_password(self):
        r = self.client.post("/api/auth/login/", {"username": "boss", "password": "nope"}, format="json")
        self.assertEqual(r.status_code, 400)

    # ---- CRUD ------------------------------------------------------------
    def test_faq_add_edit_remove(self):
        self.login()
        r = self.client.post("/api/admin/faqs/", {"question": "New?", "answer": "Yes."}, format="json")
        self.assertEqual(r.status_code, 201)
        pk = r.data["id"]
        r = self.client.patch(f"/api/admin/faqs/{pk}/", {"answer": "Definitely."}, format="json")
        self.assertEqual(r.data["answer"], "Definitely.")
        self.assertEqual(self.client.delete(f"/api/admin/faqs/{pk}/").status_code, 204)
        self.assertFalse(FAQ.objects.filter(pk=pk).exists())

    def test_social_url_is_normalised(self):
        self.login()
        r = self.client.post("/api/admin/socials/", {"platform": "github", "url": "github.com/despina"}, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertEqual(r.data["url"], "https://github.com/despina")

    def test_project_with_image_upload_and_tags(self):
        self.login()
        img = SimpleUploadedFile("cover.png", png_bytes(), content_type="image/png")
        r = self.client.post("/api/admin/projects/", {
            "name": "Carryon", "category": "web-dev", "tags": "React, Tailwind, Landing page",
            "website_link": "carryon.vercel.app", "image": img, "color": "#ffeedd",
        }, format="multipart")
        self.assertEqual(r.status_code, 201, r.content)
        self.assertEqual(r.data["tags"], ["React", "Tailwind", "Landing page"])
        self.assertTrue(r.data["image_src"].startswith("http"))
        self.assertEqual(r.data["website_link"], "https://carryon.vercel.app")
        # public site now sees it
        pub = self.client.get("/api/bootstrap/").data["projects"]
        self.assertEqual(pub[0]["name"], "Carryon")
        # clear the image
        pk = r.data["id"]
        r = self.client.patch(f"/api/admin/projects/{pk}/", {"clear_image": "true"}, format="multipart")
        self.assertEqual(r.data["image_src"], "")

    def test_bad_colour_rejected(self):
        self.login()
        r = self.client.post("/api/admin/projects/", {"name": "x", "color": "red"}, format="json")
        self.assertEqual(r.status_code, 400)

    def test_reorder(self):
        self.login()
        ids = [self.client.post("/api/admin/socials/", {"platform": "x", "url": f"x.com/{i}"}, format="json").data["id"] for i in range(3)]
        r = self.client.post("/api/admin/socials/reorder/", {"ids": list(reversed(ids))}, format="json")
        self.assertEqual(r.status_code, 200)
        self.assertEqual([s.id for s in SocialLink.objects.all()], list(reversed(ids)))

    def test_profile_update_location_and_number(self):
        self.login()
        r = self.client.patch("/api/admin/profile/", {"location": "Lagos, Nigeria", "phone": "+234 800 000 0000", "whatsapp": "2348000000000"}, format="json")
        self.assertEqual(r.status_code, 200)
        pub = self.client.get("/api/bootstrap/").data["profile"]
        self.assertEqual(pub["location"], "Lagos, Nigeria")
        self.assertEqual(pub["whatsapp"], "2348000000000")

    def test_profile_rejects_bad_whatsapp(self):
        self.login()
        r = self.client.patch("/api/admin/profile/", {"whatsapp": "+234 813"}, format="json")
        self.assertEqual(r.status_code, 400)

    def test_messages_inbox(self):
        Message.objects.create(name="Ada", email="a@x.com", details="Hello there friend")
        self.login()
        r = self.client.get("/api/admin/messages/")
        self.assertEqual(len(r.data), 1)
        pk = r.data[0]["id"]
        self.assertFalse(r.data[0]["is_read"])
        self.assertTrue(self.client.patch(f"/api/admin/messages/{pk}/", {"is_read": True}, format="json").data["is_read"])
        self.assertEqual(self.client.get("/api/admin/stats/").data["unread"], 0)
        self.assertEqual(self.client.delete(f"/api/admin/messages/{pk}/").status_code, 204)

    def test_new_project_goes_first_and_faq_goes_last(self):
        self.login()
        a = self.client.post("/api/admin/projects/", {"name": "A"}, format="json").data["id"]
        b = self.client.post("/api/admin/projects/", {"name": "B"}, format="json").data["id"]
        self.assertEqual([p["id"] for p in self.client.get("/api/admin/projects/").data], [b, a])
        f1 = self.client.post("/api/admin/faqs/", {"question": "1", "answer": "x"}, format="json").data["id"]
        f2 = self.client.post("/api/admin/faqs/", {"question": "2", "answer": "x"}, format="json").data["id"]
        self.assertEqual([f["id"] for f in self.client.get("/api/admin/faqs/").data], [f1, f2])
