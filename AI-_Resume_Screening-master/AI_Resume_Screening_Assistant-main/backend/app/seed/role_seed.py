from sqlalchemy.orm import Session

from app.models.role import Role


def seed_roles(db: Session):

    roles = [
        "HR",
        "Recruiter"
    ]

    for role_name in roles:

        role = (
            db.query(Role)
            .filter(Role.name == role_name)
            .first()
        )

        if not role:

            db.add(
                Role(
                    name=role_name
                )
            )

    db.commit()