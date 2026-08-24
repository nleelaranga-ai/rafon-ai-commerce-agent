from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("")
def health_check() -> dict[str, object]:
    return {
        "status": "ok",
        "service": "rafon-ai-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
