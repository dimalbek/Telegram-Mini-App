from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..repositories.users import UsersRepository
from ..schemas.users import UserOut, UserUpdate, UserCreate
from ..database.base import get_db

router = APIRouter()
users_repository = UsersRepository()


@router.post("/", response_model=UserOut)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    user = users_repository.create_user(db, user_data)
    return user

# Get current user profile
@router.get("/", response_model=UserOut)
def get_current_user(user_id: int, db: Session = Depends(get_db)):
    user = users_repository.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Update current user profile
@router.patch("/", response_model=UserOut)
def update_current_user(
    user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)
):
    updated_user = users_repository.update_user(db, user_id, user_data)
    return updated_user


# Delete user account
@router.delete("/")
def delete_current_user(user_id: int, db: Session = Depends(get_db)):
    users_repository.delete_user(db, user_id)
    return {"detail": "User deleted successfully"}