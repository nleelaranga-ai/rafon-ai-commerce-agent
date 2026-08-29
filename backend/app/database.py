from typing import Any

from app.config import settings

try:
    from sqlalchemy import create_engine
    from sqlalchemy.orm import DeclarativeBase, sessionmaker

    class Base(DeclarativeBase):
        pass

    connect_args: dict[str, object] = {}
    if settings.database_url.startswith("sqlite"):
        connect_args["check_same_thread"] = False

    engine = create_engine(
        settings.database_url,
        connect_args=connect_args,
        pool_pre_ping=True,
    )
    SessionLocal = sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False,
    )

    def get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

except ImportError:
    class Base:
        pass

    def get_db():
        yield None



# In-memory fast stores for real-time latency and zero-config deployment
CONVERSATION_STORE: dict[str, list[dict[str, Any]]] = {}
ORDER_STORE: dict[str, dict[str, Any]] = {}
PAYMENT_STORE: dict[str, dict[str, Any]] = {}
AUDIT_STORE: list[dict[str, Any]] = []

MERCHANT_SETTINGS: dict[str, Any] = {
    "max_ai_discount_pct": 5,
    "target_upsell_margin_pct": 25,
    "min_inventory_threshold": 3,
    "hold_duration_minutes": 15,
    "rescue_discount_pct": 5,
}

