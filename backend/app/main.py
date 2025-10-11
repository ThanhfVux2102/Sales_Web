# backend/app/main.py
from __future__ import annotations

import os
import logging
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, conint
from dotenv import load_dotenv

from app.services.emailer import send_email
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"

load_dotenv(dotenv_path=ENV_PATH)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("mini-be")

class OrderItem(BaseModel):
    id: str = Field(..., min_length=1)
    qty: conint(strict=True, gt=0)

class OrderCreate(BaseModel):
    email: EmailStr
    name: str | None = None
    note: str | None = None
    items: list[OrderItem] = Field(..., min_items=1)

app = FastAPI(title="Mini Shop B.E", version="0.1.0")

# CORS (dev cho phép localhost:3000; khi deploy hãy khóa domain cụ thể của FE)
FRONTEND_ORIGINS = [
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", ""),   # ví dụ: https://mini-fe.vercel.app
]
# loại bỏ chuỗi rỗng để tránh cảnh báo
FRONTEND_ORIGINS = [o for o in FRONTEND_ORIGINS if o]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://sales-web-jet.vercel.app",  
    ],
    allow_methods=["*"], 
    allow_headers=["*"],  
)


# -----------------------------------------------------------------------------
# Healthcheck
# -----------------------------------------------------------------------------
@app.get("/", summary="Healthcheck")
def health():
    return {
        "ok": True,
        "service": "mini-be",
        "env": os.getenv("ENV", "dev"),
    }

# -----------------------------------------------------------------------------
# Create Order
# -----------------------------------------------------------------------------
@app.post("/order", summary="Create order and notify admin")
async def create_order(order: OrderCreate):
    """
    Nhận đơn hàng từ FE, gửi email đến ADMIN_EMAIL qua Resend.
    Body mẫu:
    {
      "email": "customer@example.com",
      "name": "Customer A",
      "note": "Call me",
      "items": [{"id": "p1", "qty": 1}]
    }
    """
    payload = {
        "email": order.email,
        "name": order.name,
        "note": order.note,
        "items": [it.dict() for it in order.items],
    }

    # Kiểm tra cấu hình email trước khi gửi
    if not os.getenv("RESEND_API_KEY") or not os.getenv("ADMIN_EMAIL"):
        missing = []
        if not os.getenv("RESEND_API_KEY"):
            missing.append("RESEND_API_KEY")
        if not os.getenv("ADMIN_EMAIL"):
            missing.append("ADMIN_EMAIL")
        logger.error("Missing email config: %s", ", ".join(missing))
        raise HTTPException(status_code=500, detail=f"Missing email configuration: {', '.join(missing)}")

    try:
        await send_email(payload)
        logger.info("Order emailed to admin: %s", os.getenv("ADMIN_EMAIL"))
        return {"ok": True, "message": "Order received and email sent!"}
    except HTTPException as e:
        # lỗi đã chuẩn hóa từ emailer (httpx error,…)
        logger.exception("Email send failed (HTTPException): %s", e.detail)
        raise
    except Exception as e:
        logger.exception("Email send failed (Unexpected): %s", str(e))
        raise HTTPException(status_code=500, detail="Failed to send notification")


