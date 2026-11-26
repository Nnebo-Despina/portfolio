from django.contrib import admin

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

for m in (Project, FAQ, SocialLink, Experience, Education, Review, Tool, Message, SiteProfile):
    admin.site.register(m)
