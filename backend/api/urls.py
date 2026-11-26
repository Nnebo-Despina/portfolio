from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("projects", views.ProjectAdmin, basename="admin-projects")
router.register("faqs", views.FAQAdmin, basename="admin-faqs")
router.register("socials", views.SocialAdmin, basename="admin-socials")
router.register("experience", views.ExperienceAdmin, basename="admin-experience")
router.register("education", views.EducationAdmin, basename="admin-education")
router.register("reviews", views.ReviewAdmin, basename="admin-reviews")
router.register("tools", views.ToolAdmin, basename="admin-tools")
router.register("messages", views.MessageAdmin, basename="admin-messages")

urlpatterns = [
    # public
    path("bootstrap/", views.BootstrapView.as_view()),
    path("contact/", views.ContactView.as_view()),
    # auth
    path("auth/login/", views.LoginView.as_view()),
    path("auth/logout/", views.LogoutView.as_view()),
    path("auth/me/", views.MeView.as_view()),
    # admin
    path("admin/profile/", views.ProfileAdmin.as_view()),
    path("admin/stats/", views.StatsView.as_view()),
    path("admin/", include(router.urls)),
]
