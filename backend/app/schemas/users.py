from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    user_id: int  # Telegram user ID
    username: str
    tokens_balance: Optional[int] = 0
    experience_points: Optional[int] = 0
    level: Optional[int] = 1

    class Config:
        schema_extra = {
            "example": {
                "user_id": 123456789,
                "username": "john_doe",
                "tokens_balance": 10,
                "experience_points": 200,
                "level": 2,
            }
        }


class UserUpdate(BaseModel):
    username: Optional[str]
    tokens_balance: Optional[int]
    experience_points: Optional[int]
    level: Optional[int]


class UserOut(BaseModel):
    user_id: int
    username: str
    registration_date: datetime
    tokens_balance: int
    experience_points: int
    level: int

    class Config:
        orm_mode = True