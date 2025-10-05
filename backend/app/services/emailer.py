# app/emailer.py
from __future__ import annotations
import os
import json
import requests

def _clean(s: str) -> str:
    # loại bỏ khoảng trắng/ngoặc/ký tự ẩn
    return (s or "").strip().strip('"').strip("'").replace("\ufeff", "").replace("\u200b", "")

def send_email(payload: dict) -> bool:
    # ĐỌC ENV NGAY TRONG HÀM (không cache ở cấp module)
    api_key     = _clean(os.getenv("RESEND_API_KEY"))
    from_email  = _clean(os.getenv("FROM_EMAIL"))
    admin_email = _clean(os.getenv("ADMIN_EMAIL"))

    # DEBUG
    print(
        "[DEBUG emailer] key:",
        (api_key[:6] if api_key else None),
        "...",
        (api_key[-4:] if api_key else None),
        "len=", len(api_key or "")
    )
    print("[DEBUG emailer] from:", from_email, "| to:", admin_email)

    # Kiểm tra thiếu env
    missing = [k for k, v in {
        "RESEND_API_KEY": api_key,
        "FROM_EMAIL": from_email,
        "ADMIN_EMAIL": admin_email
    }.items() if not v]
    if missing:
        print("[EMAILER] Missing env:", ", ".join(missing))
        return False

    # Body tối giản để tránh lỗi render HTML
    body = {
        "from": from_email,              # ví dụ: "Shop <onboarding@resend.dev>"
        "to": [admin_email],             # ví dụ: "you@gmail.com"
        "subject": "New order notification",
        "text": "New order:\n" + json.dumps(payload, ensure_ascii=False, indent=2),
    }

    try:
        resp = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {api_key}",    # <-- dùng biến LOCAL đã clean
                "Content-Type": "application/json",
            },
            json=body,
            timeout=20,
        )
        print("[EMAILER] Resend status:", resp.status_code)
        print("[EMAILER] Resend resp:", resp.text)
        resp.raise_for_status()
        return True
    except Exception as e:
        print("[EMAILER] ERROR >>>", repr(e))
        return False
