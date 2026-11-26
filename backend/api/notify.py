import logging
import threading

from django.conf import settings
from django.core.mail import EmailMessage

from .models import SiteProfile

log = logging.getLogger(__name__)


def _send(message):
    to = settings.NOTIFY_EMAIL or SiteProfile.load().email
    body = (
        f"New message from your portfolio\n\n"
        f"Name: {message.name}\n"
        f"Email: {message.email}\n"
        f"Phone: {message.phone or '-'}\n"
        f"Interested in: {message.interest or '-'}\n"
        f"Budget: {message.budget or '-'}\n"
        f"Country: {message.country or '-'}\n\n"
        f"{message.details}\n"
    )
    try:
        EmailMessage(
            subject=f"New portfolio message from {message.name}",
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[to],
            reply_to=[message.email],  # hitting Reply goes straight to the visitor
        ).send(fail_silently=False)
    except Exception:
        log.exception("Could not send contact notification email")


def notify_new_message(message):
    """Send in the background so the visitor never waits on the mail server."""
    if not settings.EMAIL_HOST_USER and not settings.DEBUG:
        return  # email not configured yet
    threading.Thread(target=_send, args=(message,), daemon=True).start()