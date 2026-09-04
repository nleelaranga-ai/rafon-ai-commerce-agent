import os
from datetime import datetime, timezone
from typing import Any
from app.config import settings

DATABASE_URL = os.getenv("DATABASE_URL") or settings.database_url
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

try:
    from sqlalchemy import Column, Float, Integer, JSON, String, create_engine
    from sqlalchemy.orm import declarative_base, sessionmaker

    connect_args: dict[str, object] = {}
    if DATABASE_URL and DATABASE_URL.startswith("sqlite"):
        connect_args["check_same_thread"] = False

    engine = create_engine(
        DATABASE_URL or "sqlite:///./rafon.db",
        connect_args=connect_args,
        pool_pre_ping=True,
    )
    SessionLocal = sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False,
    )
    Base = declarative_base()

    class CartReservation(Base):
        __tablename__ = "cart_reservations"

        id = Column(String, primary_key=True, index=True)
        order_id = Column(String, index=True)
        rescue_code = Column(String)
        discount_pct = Column(Integer, default=5)
        hold_duration_minutes = Column(Integer, default=15)
        expires_at = Column(String)
        status = Column(String, default="ACTIVE")
        created_at = Column(String, default=lambda: datetime.now(timezone.utc).isoformat())

    class OrderModel(Base):
        __tablename__ = "orders"

        id = Column(String, primary_key=True, index=True)
        conversation_id = Column(String, index=True, nullable=True)
        razorpay_order_id = Column(String, index=True, nullable=True)
        total_amount = Column(Float)
        currency = Column(String, default="INR")
        status = Column(String, default="CREATED")
        items = Column(JSON, default=list)
        created_at = Column(String, default=lambda: datetime.now(timezone.utc).isoformat())

    class AuditLogModel(Base):
        __tablename__ = "audit_logs"

        id = Column(String, primary_key=True, index=True)
        trace_id = Column(String, index=True)
        timestamp = Column(String, default=lambda: datetime.now(timezone.utc).isoformat())
        event_type = Column(String, index=True)
        severity = Column(String, default="INFO")
        actor = Column(String, default="RAFON_ENGINE")
        payload = Column(JSON, default=dict)
        hash_signature = Column(String)

    try:
        Base.metadata.create_all(bind=engine)
    except Exception:
        pass

    def get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

except ImportError:
    engine = None
    SessionLocal = None
    Base = None
    CartReservation = None
    OrderModel = None
    AuditLogModel = None

    def get_db():
        yield None


# In-memory stores for ultra-low latency access
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


