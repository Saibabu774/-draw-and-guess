from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

BCRYPT_MAX_BYTES = 72

def _normalize_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > BCRYPT_MAX_BYTES:
        password_bytes = password_bytes[:BCRYPT_MAX_BYTES]
    return password_bytes.decode("utf-8", errors="ignore")

def hash_password(password: str) -> str:
    password = _normalize_password(password)
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_password = _normalize_password(plain_password)
    return pwd_context.verify(plain_password, hashed_password)