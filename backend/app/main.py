import os
import httpx

RESEND_URL = "https://api.resend.com/emails"

def _text(payload: dict) -> str:
    lines = [
        "New order",
        f"Name: {payload.get('name') or '-'}",
        f"Email: {payload['email']}",
        f"Note: {payload.get('note') or '-'}",
        "Items:",
    ]
    for it in payload["items"]:
        lines.append(f"• {it['id']} x {it['qty']}")
    return "\n".join(lines)

def _html(payload: dict) -> str:
    items = "".join([f"<li>{it['id']} × {it['qty']}</li>" for it in payload["items"]])
    return f"""
    <div style="font-family:ui-sans-serif,system-ui">
      <h2>🛒 New order received</h2>
      <p><b>Name:</b> {payload.get('name') or '-'}</p>
      <p><b>Email:</b> {payload['email']}</p>
      <p><b>Note:</b> {payload.get('note') or '-'}</p>
      <p><b>Items:</b></p>
      <ul>{items}</ul>
      <hr/>
      <small>Sent automatically by Mini Shop</small>
    </div>
    """

async def send_email(payload: dict):
    api_key = os.getenv("RESEND_API_KEY")
    to = os.getenv("ADMIN_EMAIL")
    from_addr = os.getenv("FROM_EMAIL", "orders@resend.dev")
    if not api_key or not to:
        raise RuntimeError("Missing RESEND_API_KEY or ADMIN_EMAIL")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    data = {
        "from": from_addr,
        "to": to,
        "subject": "New order received",
        "text": _text(payload),
        "html": _html(payload),
    }

    async with httpx.AsyncClient(timeout=20) as client:
        resp = await client.post(RESEND_URL, headers=headers, json=data)
        resp.raise_for_status()
