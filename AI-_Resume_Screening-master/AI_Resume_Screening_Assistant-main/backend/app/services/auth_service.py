from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.models.role import Role
from app.models.user import User
from app.schemas.auth import UserRegister, UserResponse, Token
from app.utils.jwt_handler import create_access_token
from app.utils.password import hash_password, verify_password


class AuthService:

    @staticmethod
    def register(user_data: UserRegister, db: Session) -> UserResponse:

        existing_user = (
            db.query(User)
            .filter(
                User.email == user_data.email,
                User.is_deleted == False
            )
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        role = (
            db.query(Role)
            .filter(Role.name == user_data.role)
            .first()
        )

        if role is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Role not found"
            )

        new_user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            password=hash_password(user_data.password),
            role_id=role.id
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return UserResponse(
            id=new_user.id,
            full_name=new_user.full_name,
            email=new_user.email,
            role=new_user.role.name
        )

    @staticmethod
    def login(
        form_data: OAuth2PasswordRequestForm,
        db: Session
    ) -> Token:

        user = (
            db.query(User)
            .filter(
                User.email == form_data.username,
                User.is_deleted == False
            )
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        if not verify_password(
            form_data.password,
            user.password
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        access_token = create_access_token(
            {
                "sub": str(user.id),
                "role": user.role.name
            }
        )

        return Token(
            access_token=access_token,
            token_type="bearer"
        )