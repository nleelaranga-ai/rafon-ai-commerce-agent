from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.health import router as health_router
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
    allow_origins=[
        settings.frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)
app.include_router(products_router)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "RAFON AI API",
        "version": settings.app_version,
        "status": "online",
        "docs": "/docs",
    }
