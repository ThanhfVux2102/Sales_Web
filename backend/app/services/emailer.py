import os
import httpx
from fastapi import HTTPException

RESEND_URL = "https://api.resend.com/emails"

def _text(payload: dict) -> str:
    """Tạo nội dung email dạng text (backup cho trình mail không hỗ trợ HTML)."""
    lines = [
        "🛒 New order received",
        f"Name: {payload.get('name') or '-'}",
        f"Email: {payload.get('email') or '-'}",
        f"Note: {payload.get('note') or '-'}",
        "",
        "Items:"
    ]
    for it in payload.get("items", []):
        lines.append(f"• {it['id']} × {it['qty']}")
    return "\n".join(lines)


def _html(payload: dict) -> str:
    """Tạo nội dung email dạng HTML."""
    items = "".join(
        [f"<li>{it['id']} × {it['qty']}</li>" for it in payload.get("items", [])]
    )
    return f"""
    <div style="font-family:ui-sans-serif,system-ui">
      <h2>🛒 New order received</h2>
      <p><b>Name:</b> {payload.get('name') or '-'}</p>
      <p><b>Email:</b> {payload.get('email') or '-'}</p>
      <p><b>Note:</b> {payload.get('note') or '-'}</p>
      <p><b>Items:</b></p>
      <ul>{items}</ul>
      <hr/>
      <small>Sent automatically by Mini Shop</small>
    </div>
    """


async def send_email(payload: dict):
    """Gửi email thông báo bằng Resend API."""
    api_key = os.getenv("RESEND_API_KEY")
    admin_email = os.getenv("ADMIN_EMAIL")
    from_email = os.getenv("FROM_EMAIL", "orders@resend.dev")

    if not api_key or not admin_email:
        raise HTTPException(status_code=500, detail="Missing email configuration")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    body = {
        "from": from_email,
        "to": admin_email,
        "subject": "🛒 New order received",
        "text": _text(payload),
        "html": _html(payload),
    }

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post(RESEND_URL, headers=headers, json=body)
            response.raise_for_status()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Email sending failed: {str(e)}")
