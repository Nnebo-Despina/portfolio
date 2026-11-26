"""Fill an empty database with Despina's current portfolio content.

    python manage.py seed_portfolio            # only fills empty tables
    python manage.py seed_portfolio --reset    # wipes content tables first (keeps messages + users)
"""
import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from api.models import (
    FAQ,
    Education,
    Experience,
    Project,
    SiteProfile,
    SocialLink,
    Tool,
    Review,
)

SOCIALS = [
    ("behance", "despinannebs22", "https://behance.net/despinannebs22"),
    ("x", "callme_despina", "https://x.com/callme_despina"),
    ("instagram", "callme_despina", "https://instagram.com/callme_despina"),
    ("tiktok", "callme_despina", "https://tiktok.com/callme_despina"),
]

TOOLS = [
    ("VS Code", 97, "/img/vscode.webp"),
    ("Figma", 90, "/img/figma.webp"),
    ("Sketch", 40, "/img/sketch.webp"),
]

EXPERIENCE = [
    ("App Front End Developer ~ Flutter", "2026",
     "Worked on building responsive interfaces and improving user experience across multiple mobile applications, focusing on performance, accessibility, and clean design."),
    ("Web Front End Development ~ React", "2025",
     "Worked on building responsive interfaces and improving user experience across multiple websites & webapps, focusing on performance, accessibility, and clean design."),
    ("UI/UX Design ~ Figma", "2025",
     "Worked on building responsive interfaces and creating user experience across multiple web & mobile sites and applications, focusing on performance, accessibility, and clean design."),
]

EDUCATION = [
    ("App Front End Development ~ Flutter", "2026",
     "Studied core principles of app development and design, gaining practical skills in building responsive, user-friendly digital products."),
    ("Web Front End Development ~ React", "2026",
     "Studied core principles of web development and UI/UX design, gaining practical skills in building responsive, user-friendly digital products."),
    ("UI/UX Design ~ Figma", "2025",
     "Studied core principles of website & app development and UI/UX design, gaining practical skills in building responsive, user-friendly digital products."),
]

FAQS = [
    ("What services do you offer?", "I design and develop modern websites and mobile interfaces, focusing on clean UI, smooth user experience, and responsive frontend development."),
    ("How much do your services cost?", "My pricing ranges from $10 to $3000 depending on project size, complexity, and estimated delivery timeline."),
    ("Do you build full websites or only design?", "I can both design interfaces and develop frontend websites, depending on what the project requires."),
    ("How long does a project take?", "Delivery time depends on the scope of the project, but most projects typically take anywhere from a few days to a few weeks."),
    ("What tools do you use for your work?", "I mainly use Figma for design and React, HTML, CSS, and JavaScript for frontend development."),
    ("Can you redesign an existing website?", "Yes, I can improve or completely redesign existing websites to make them more modern, responsive, and user-friendly."),
    ("Do you work with clients internationally?", "Yes, I work with clients from different countries and communicate remotely throughout the entire project process."),
    ("What do you need to start a project?", "I usually need a clear idea of the project, any references or inspirations, and your required features or goals."),
    ("Can you maintain or update my website?", "Yes, I can help with ongoing maintenance, updates, and improvements after the initial project is completed."),
    ("How do we communicate during a project?", "We can communicate through email, WhatsApp, or any preferred platform to ensure smooth updates and feedback."),
]

PROJECTS = [
    dict(name="TrustMed - Mobile App For Health Care", category="mobile-ui",
         tags=["UI/UX", "App Design", "Health Care"], image_url="/projects/trustmed.webp", color="#DDF3EA",
         figma_link="https://www.figma.com/proto/Piw3jVG2paalP73mVsX0L5/Team-C?page-id=0%3A1&node-id=63-567&p=f&viewport=649%2C145%2C0.02&t=86pAZsid15LleDws-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=445%3A1756&show-proto-sidebar=1",
         behance_link="https://www.behance.net/gallery/235491973/TrustMed-Mobile-App-For-HealthCare"),
    dict(name="Secure Homes - Web App For Purchasing Properties", category="web-ui",
         tags=["UI/UX", "Website Design", "E-commerce"], image_url="/projects/secure-homes.webp", color="#E3E8FF",
         figma_link="https://www.figma.com/proto/1smtbMcS45xRCv57y1pHba/Secure-Homes?node-id=1-2&p=f&viewport=446%2C187%2C0.02&t=r91ewc51scxlKmNm-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&page-id=0%3A1"),
    dict(name="Pizza Square - Website for Purchasing Pizza", category="web-dev",
         tags=["Website", "Frontend Dev", "E-commerce"], image_url="/projects/pizza-square.webp", color="#FFE3D6",
         website_link="https://pizza-square-web.vercel.app"),
    dict(name="Snowell Electric - Website for Buying Electric Appliances", category="web-dev",
         tags=["Website", "Frontend Dev", "E-commerce"], image_url="/projects/snowell.webp", color="#E9F1FF",
         website_link="https://snowell-electric.vercel.app"),
]


class Command(BaseCommand):
    help = "Seed the portfolio content and (optionally) create the admin user."

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete existing content first")

    def handle(self, *args, **opts):
        if opts["reset"]:
            for m in (Project, FAQ, SocialLink, Experience, Education, Tool, Review):
                m.objects.all().delete()
            self.stdout.write("Existing content cleared.")

        SiteProfile.load()

        def fill(model, rows, build):
            if model.objects.exists():
                self.stdout.write(f"  {model.__name__}: already has data, skipped")
                return
            for i, row in enumerate(rows, start=1):
                model.objects.create(order=i, **build(row))
            self.stdout.write(f"  {model.__name__}: added {len(rows)}")

        fill(SocialLink, SOCIALS, lambda r: dict(platform=r[0], label=r[1], url=r[2]))
        fill(Tool, TOOLS, lambda r: dict(name=r[0], level=r[1], icon_url=r[2]))
        fill(Experience, EXPERIENCE, lambda r: dict(title=r[0], period=r[1], description=r[2]))
        fill(Education, EDUCATION, lambda r: dict(title=r[0], period=r[1], description=r[2]))
        fill(FAQ, FAQS, lambda r: dict(question=r[0], answer=r[1]))
        fill(Project, PROJECTS, lambda r: r)

        # Admin user from env (only if provided and not existing)
        username = os.getenv("ADMIN_USERNAME")
        password = os.getenv("ADMIN_PASSWORD")
        if username and password:
            User = get_user_model()
            if not User.objects.filter(username=username).exists():
                User.objects.create_superuser(
                    username=username, password=password, email=os.getenv("ADMIN_EMAIL", "")
                )
                self.stdout.write(self.style.SUCCESS(f"Admin user '{username}' created."))
            else:
                self.stdout.write(f"Admin user '{username}' already exists.")
        else:
            self.stdout.write(
                "No ADMIN_USERNAME / ADMIN_PASSWORD in .env. Create your login with: python manage.py createsuperuser"
            )
        self.stdout.write(self.style.SUCCESS("Seed complete."))
