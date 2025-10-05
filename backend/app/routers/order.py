from fastapi import APIRouter, HTTPException
from ..schemas.order import OrderCreate
from ..services.emailer import send_email

router = APIRouter(prefix="/order", tags=["order"])

@router.post("", summary="Create order and notify admin")
async def create_order(order: OrderCreate):
    payload = {
        "email": order.email,
        "name": order.name,
        "note": order.note,
        "items": [it.dict() for it in order.items],
    }
    try:
        await send_email(payload)
        return {"ok": True}
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to send notification")
