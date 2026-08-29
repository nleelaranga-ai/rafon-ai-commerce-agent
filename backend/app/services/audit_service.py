import hashlib
import json
import uuid
from datetime import datetime, timezone
from typing import Any

from app.database import AUDIT_STORE
from app.schemas.audit import AuditEvent


class AuditService:
    @staticmethod
    def log_event(
        event_type: str,
        payload: dict[str, Any],
        trace_id: str | None = None,
        severity: str = "INFO",
        actor: str = "RAFON_AI_AGENT",
    ) -> AuditEvent:
        event_id = f"aud_{uuid.uuid4().hex[:10]}"
        active_trace_id = trace_id or f"trc_{uuid.uuid4().hex[:8]}"
        timestamp = datetime.now(timezone.utc).isoformat()

        payload_str = json.dumps(payload, sort_keys=True, default=str)
        hash_signature = hashlib.sha256(
            f"{event_id}:{active_trace_id}:{event_type}:{payload_str}".encode("utf-8")
        ).hexdigest()

        event = AuditEvent(
            id=event_id,
            trace_id=active_trace_id,
            timestamp=timestamp,
            event_type=event_type,
            severity=severity,
            actor=actor,
            payload=payload,
            hash_signature=f"sha256:{hash_signature[:16]}",
        )

        AUDIT_STORE.insert(0, event.model_dump())
        return event

    @staticmethod
    def get_all_events(limit: int = 50) -> list[dict[str, Any]]:
        return AUDIT_STORE[:limit]


audit_service = AuditService()
