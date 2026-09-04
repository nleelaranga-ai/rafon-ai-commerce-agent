import asyncio
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def run_tests():
    print("[TEST] Starting RAFON AI Backend Test Suite...")

    # 1. Root & Health
    r = client.get("/")
    assert r.status_code == 200, f"Root failed: {r.text}"
    print("[PASS] GET /: OK", r.json())

    r = client.get("/health")
    assert r.status_code == 200, f"Health failed: {r.text}"
    print("[PASS] GET /health: OK")

    # 2. Products
    r = client.get("/products")
    assert r.status_code == 200, f"Products failed: {r.text}"
    products = r.json()
    assert len(products) >= 5, "Not enough products in catalog"
    print(f"[PASS] GET /products: OK ({len(products)} products available)")

    # 3. Chat: Greeting
    r = client.post("/chat", json={"message": "Hi, who are you?"})
    assert r.status_code == 200, f"Chat greeting failed: {r.text}"
    chat_res = r.json()
    assert "conversation_id" in chat_res
    print("[PASS] POST /chat (Greeting): OK -> Intent:", chat_res["intent"])

    conv_id = chat_res["conversation_id"]

    # 4. Chat: Gaming Earbuds under 6000
    r = client.post("/chat", json={
        "message": "I need wireless earbuds for gaming under 6000",
        "conversation_id": conv_id
    })
    assert r.status_code == 200, f"Chat gaming query failed: {r.text}"
    res2 = r.json()
    assert res2["recommended_product_id"] == "nothing-ear-a"
    assert res2["budget"] == 6000
    assert len(res2["telemetry"]) >= 4
    print(f"[PASS] POST /chat (Gaming Audio): OK -> Rec: {res2['recommended_product_id']}, Upsell: {res2['upsell_product_id']}")
    print(f"       Telemetry steps: {[t['name'] for t in res2['telemetry']]}")

    # 5. Chat: Cheaper comparison
    r = client.post("/chat", json={
        "message": "Anything cheaper?",
        "conversation_id": conv_id
    })
    assert r.status_code == 200, f"Chat comparison failed: {r.text}"
    res3 = r.json()
    assert res3["recommended_product_id"] == "boat-immortal-131"
    print(f"[PASS] POST /chat (Cheaper option): OK -> Rec: {res3['recommended_product_id']}")

    # 6. Orders: Create Order with bundled upsell
    r = client.post("/orders/create", json={
        "conversation_id": conv_id,
        "items": [
            {"product_id": "nothing-ear-a", "name": "Nothing Ear (a)", "quantity": 1, "unit_price": 5499, "is_upsell": False},
            {"product_id": "fast-charger-65w", "name": "65W GaN Fast Charger", "quantity": 1, "unit_price": 499, "is_upsell": True}
        ],
        "applied_discount_code": None
    })
    assert r.status_code == 200, f"Order create failed: {r.text}"
    order = r.json()
    order_id = order["id"]
    assert order["total"] == 5998
    print(f"[PASS] POST /orders/create: OK -> Order ID: {order_id}, Total: Rs.{order['total']}, Razorpay ID: {order['razorpay_order_id']}")

    # 7. Payments: Verify payment
    r = client.post("/payments/verify", json={
        "order_id": order_id,
        "razorpay_order_id": order["razorpay_order_id"],
        "razorpay_payment_id": "pay_test_98741",
        "razorpay_signature": "sig_test_valid"
    })
    assert r.status_code == 200, f"Payment verify failed: {r.text}"
    print(f"[PASS] POST /payments/verify: OK -> Status: {r.json()['status']}")

    # 8. Recovery: Trigger failure rescue
    r = client.post("/payments/recover", json={
        "order_id": order_id,
        "error_code": "ERR_BANK_504_TIMEOUT",
        "error_description": "Bank timeout on UPI channel",
        "payment_method": "UPI"
    })
    assert r.status_code == 200, f"Recovery trigger failed: {r.text}"
    recovery = r.json()
    assert recovery["rescue_code"] == "RESCUE5"
    assert recovery["hold_duration_minutes"] == 15
    print(f"[PASS] POST /payments/recover: OK -> Rescue Code: {recovery['rescue_code']}, Revised Total: Rs.{recovery['revised_total']}")

    # 9. Audit: Get audit trail & merchant metrics
    r = client.get("/audit")
    assert r.status_code == 200, f"Audit failed: {r.text}"
    audit_data = r.json()
    assert len(audit_data["events"]) >= 5
    print(f"[PASS] GET /audit: OK -> {audit_data['total_events_logged']} events logged, Integrity: {audit_data['integrity_status']}")
    print(f"       AOV Lift: +{audit_data['metrics']['aov_lift_percentage']}% | Recovery Rate: {audit_data['metrics']['recovery_rate_percentage']}%")

    # 10. Policies: Test Merchant Governance Playground
    r = client.get("/policies")
    assert r.status_code == 200, f"Policies get failed: {r.text}"
    pol_data = r.json()
    assert pol_data["guardrail_status"] == "ACTIVE"
    print(f"[PASS] GET /policies: OK -> Guardrails active: {pol_data['policies']}")

    r = client.post("/policies", json={
        "max_ai_discount_pct": 7,
        "target_upsell_margin_pct": 30,
        "hold_duration_minutes": 20,
        "min_inventory_threshold": 4,
        "rescue_discount_pct": 6
    })
    assert r.status_code == 200, f"Policies update failed: {r.text}"
    updated_pol = r.json()
    assert updated_pol["policies"]["max_ai_discount_pct"] == 7
    print(f"[PASS] POST /policies: OK -> Updated max discount to {updated_pol['policies']['max_ai_discount_pct']}%")

    print("\n>>> ALL BACKEND TESTS PASSED PERFECTLY! 100% OPERATIONAL. <<<")

if __name__ == "__main__":
    run_tests()

