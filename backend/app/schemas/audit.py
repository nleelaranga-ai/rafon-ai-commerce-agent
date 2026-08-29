from typing import Any
from pydantic import BaseModel, Field


class AuditEvent(BaseModel):
    id: str
    trace_id: str
    timestamp: str
    event_type: str  # QUERY_INGEST, INTENT_PARSED, CATALOG_BOUNDED, POLICY_ENFORCED, ORDER_CREATED, PAYMENT_VERIFIED, RECOVERY_TRIGGERED, REVENUE_RESCUED
    severity: str = "INFO"  # INFO, WARN, SUCCESS, CRITICAL
    actor: str = "RAFON_AI_AGENT"
    payload: dict[str, Any]
    hash_signature: str
