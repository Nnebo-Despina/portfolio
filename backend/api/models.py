from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models


class Ordered(models.Model):
    """Adds a manual `order` so the admin can arrange items."""

    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        abstract = True
        ordering = ["order", "id"]


class SiteProfile(models.Model):
    """Single row holding the details shown across the site."""

    name = models.CharField(max_length=120, default="Despina")
    full_name = models.CharField(max_length=160, default="Nnebo Despina")
    role = models.CharField(max_length=160, default="UI/UX Designer and Front End Developer")
    intro = models.TextField(
        default="I turn ideas into clean, modern interfaces that feel smooth, intuitive and visually striking."
    )
    about = models.TextField(blank=True)
    email = models.EmailField(default="despinannebs22@gmail.com")
    phone = models.CharField(max_length=40, default="+234 813 5744 702", help_text="Shown on the site")
    whatsapp = models.CharField(
        max_length=20,
        default="2348135744702",
        validators=[RegexValidator(r"^\d{7,15}$", "Digits only, with country code, no + or spaces.")],
        help_text="Digits only with country code, used for the WhatsApp button",
    )
    location = models.CharField(max_length=120, default="Enugu, Nigeria")
    years_experience = models.CharField(max_length=10, default="1+")
    clients_count = models.CharField(max_length=10, default="1")
    satisfaction = models.CharField(max_length=10, default="100%")
    available = models.BooleanField(default=True)
    availability_label = models.CharField(max_length=80, default="Open to new projects")

    class Meta:
        verbose_name = "Site profile"

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce a single row
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.name


class Project(Ordered):
    CATEGORIES = [
        ("mobile-ui", "Mobile UI/UX"),
        ("web-ui", "Website UI/UX"),
        ("web-dev", "Website development"),
    ]
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORIES, default="web-dev")
    description = models.TextField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    image_url = models.CharField(
        max_length=500, blank=True, help_text="Used when no image is uploaded (e.g. /projects/x.webp)"
    )
    color = models.CharField(
        max_length=7,
        default="#E7E4FF",
        validators=[RegexValidator(r"^#[0-9a-fA-F]{6}$", "Use a hex colour like #E7E4FF")],
        help_text="Card background colour",
    )
    figma_link = models.CharField(max_length=500, blank=True)
    behance_link = models.CharField(max_length=500, blank=True)
    website_link = models.CharField(max_length=500, blank=True)
    featured = models.BooleanField(default=True, help_text="Show in the home page showcase")
    published = models.BooleanField(default=True)

    class Meta(Ordered.Meta):
        pass

    def __str__(self):
        return self.name


class FAQ(Ordered):
    question = models.CharField(max_length=300)
    answer = models.TextField()

    class Meta(Ordered.Meta):
        verbose_name = "FAQ"

    def __str__(self):
        return self.question


class SocialLink(Ordered):
    PLATFORMS = [
        ("behance", "Behance"),
        ("x", "X (Twitter)"),
        ("instagram", "Instagram"),
        ("tiktok", "TikTok"),
        ("linkedin", "LinkedIn"),
        ("github", "GitHub"),
        ("dribbble", "Dribbble"),
        ("youtube", "YouTube"),
        ("facebook", "Facebook"),
        ("other", "Other"),
    ]
    platform = models.CharField(max_length=20, choices=PLATFORMS, default="other")
    label = models.CharField(max_length=80, blank=True, help_text="Handle or text, e.g. callme_despina")
    url = models.CharField(max_length=500)

    class Meta(Ordered.Meta):
        pass

    def __str__(self):
        return f"{self.get_platform_display()} - {self.label or self.url}"


class Experience(Ordered):
    title = models.CharField(max_length=200)
    period = models.CharField(max_length=60, help_text="e.g. 2025 or 2024 - 2026")
    description = models.TextField(blank=True)

    class Meta(Ordered.Meta):
        pass

    def __str__(self):
        return self.title


class Education(Ordered):
    title = models.CharField(max_length=200)
    period = models.CharField(max_length=60)
    description = models.TextField(blank=True)

    class Meta(Ordered.Meta):
        verbose_name_plural = "Education"

    def __str__(self):
        return self.title


class Review(Ordered):
    name = models.CharField(max_length=120)
    position = models.CharField(max_length=120, blank=True)
    company = models.CharField(max_length=120, blank=True)
    review = models.TextField()
    rating = models.PositiveSmallIntegerField(
        default=5, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    avatar = models.ImageField(upload_to="reviews/", blank=True, null=True)
    avatar_url = models.CharField(max_length=500, blank=True)
    published = models.BooleanField(default=True)

    class Meta(Ordered.Meta):
        pass

    def __str__(self):
        return f"{self.name} ({self.rating}/5)"


class Tool(Ordered):
    name = models.CharField(max_length=80)
    level = models.PositiveSmallIntegerField(
        default=80, validators=[MinValueValidator(0), MaxValueValidator(100)], help_text="0 to 100"
    )
    icon = models.ImageField(upload_to="tools/", blank=True, null=True)
    icon_url = models.CharField(max_length=500, blank=True)

    class Meta(Ordered.Meta):
        pass

    def __str__(self):
        return self.name


class Message(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    interest = models.CharField(max_length=120, blank=True)
    budget = models.CharField(max_length=60, blank=True)
    country = models.CharField(max_length=80, blank=True)
    details = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.created_at:%Y-%m-%d}"
