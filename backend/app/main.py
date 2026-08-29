from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.audit import router as audit_router
from app.routes.chat import router as chat_router
from app.routes.health import router as health_router
from app.routes.orders import router as orders_router
from app.routes.payments import router as payments_router
from app.routes.products import router as products_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=(
        "RAFON AI backend for autonomous commerce intelligence, "
        "AI recommendations, Razorpay payments, recovery and audit."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(products_router)
app.include_router(chat_router)
app.include_router(orders_router)
app.include_router(payments_router)
app.include_router(audit_router)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "RAFON AI Commerce Engine",
        "version": settings.app_version,
        "status": "online",
        "docs": "/docs",
        "track": "Track 01 — AI Growth & Agentic Commerce (Razorpay Buildathon)",
    }

