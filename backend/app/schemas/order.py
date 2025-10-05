from typing import List
from pydantic import BaseModel, EmailStr, Field, conint

class OrderItem(BaseModel):
    id: str = Field(..., min_length=1)
    qty: conint(strict=True, gt=0)

class OrderCreate(BaseModel):
    email: EmailStr
    name: str | None = None
    note: str | None = None
    items: List[OrderItem] = Field(..., min_items=1)
