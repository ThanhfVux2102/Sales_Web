import os

from pathlib import Path
from dotenv import load_dotenv

load_dotenv() 
ENV_PATH = Path(__file__).resolve().parents[1] / ".env"


from fastapi import FastAPI, HTTPException

from fastapi.middleware.cors import CORSMiddleware
from .schemas.order import OrderCreate, OrderItem
from .services.emailer import send_email

app = FastAPI(title="Mini Shop B.E", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {
        "ok": True,
        "service": "mini-be",
        "env": ("prod" if os.getenv("ENV") == "prod" else "dev"),
    }

@app.post("/order")
async def create_order(order: OrderCreate):
    data = order.model_dump()  # chuyển sang dict
    email_ok = send_email(data)

    # Đừng chặn FE bằng 500 khi email lỗi—trả trạng thái để FE biết
    return {
        "message": "Order received" + ("" if email_ok else " (email failed)"),
        "email_sent": email_ok,
    }

print("ENV_PATH =", ENV_PATH)   
