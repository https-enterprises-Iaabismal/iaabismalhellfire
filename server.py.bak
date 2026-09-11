import os, subprocess, stripe
from flask import Flask, jsonify, request

app = Flask(__name__)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_dummy")

@app.get("/")
def health():
    return jsonify({"engine": "AeroCore-X", "status": "online", "arch": "x86-64-v3"})

@app.post("/predict")
def predict():
    try:
        res = subprocess.run(["./abyssal_engine"], capture_output=True, text=True, timeout=5)
        return jsonify({"telemetry": res.stdout.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.post("/webhook/stripe")
def stripe_webhook():
    payload = request.data
    sig = request.headers.get("Stripe-Signature")
    try:
        event = stripe.Webhook.construct_event(payload, sig, os.getenv("STRIPE_WEBHOOK_SECRET", ""))
        if event["type"] == "checkout.session.completed":
            print(f"[STRIPE OK] Pago: {event['data']['object']['id']}")
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
