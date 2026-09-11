#!/bin/bash
set -e

echo "🚀 [ABYSSAL-CORE] Generando infraestructura limpia..."

# 1. Crear carpeta del proyecto e inicializar Git adentro
mkdir -p ~/iaabismalhellfire
cd ~/iaabismalhellfire

if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# 2. Motor C++20 SIMD (main.cpp)
cat << 'C_EOF' > main.cpp
#include <iostream>
#include <vector>

int main() {
    #pragma omp parallel
    {
        // Execution Core
    }
    std::cout << "{\"status\":\"online\",\"engine\":\"ABYSSAL-SIMD-v3\"}" << std::endl;
    return 0;
}
C_EOF

# 3. Servidor de Producción (server.py)
cat << 'PY_EOF' > server.py
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
PY_EOF

# 4. Dependencias
cat << 'REQ_EOF' > requirements.txt
flask
gunicorn
stripe
qdrant-client
REQ_EOF

# 5. Dockerfile Multietapa Optimizado
cat << 'DOCKER_EOF' > Dockerfile
FROM ubuntu:22.04 AS builder
RUN apt-get update && apt-get install -y clang cmake libomp-dev
WORKDIR /app
COPY main.cpp .
RUN clang++ -O3 -std=c++20 -march=x86-64-v3 -ffast-math -fopenmp main.cpp -o abyssal_engine

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y python3 python3-pip libgomp1 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/abyssal_engine .
COPY server.py requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 8080
CMD ["gunicorn", "-b", "0.0.0.0:8080", "-w", "4", "--threads", "8", "server:app"]
DOCKER_EOF

# 6. Orchestration Docker Compose
cat << 'COMPOSE_EOF' > docker-compose.yml
version: '3.8'
services:
  qdrant:
    image: qdrant/qdrant:latest
    ports: ["6333:6333"]
    volumes: ["./qdrant_storage:/qdrant/storage"]
    restart: always

  abyssal-api:
    build: .
    ports: ["8080:8080"]
    env_file: .env
    depends_on: [qdrant]
    restart: always

  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL_TOKEN}
    depends_on: [abyssal-api]
    restart: always
COMPOSE_EOF

# 7. Entorno
cat << 'ENV_EOF' > .env
STRIPE_SECRET_KEY=sk_live_tu_key
STRIPE_WEBHOOK_SECRET=whsec_tu_key
CLOUDFLARE_TUNNEL_TOKEN=tu_token_cloudflare
QDRANT_URL=http://qdrant:6333
ENV_EOF

# 8. GitHub Actions CI/CD Pipeline
mkdir -p .github/workflows
cat << 'WORKFLOW_EOF' > .github/workflows/deploy.yml
name: Abyssal Deploy
on:
  push:
    branches: ["main"]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
WORKFLOW_EOF

# 9. Ignorar temporales
cat << 'GIT_EOF' > .gitignore
.env
qdrant_storage/
abyssal_engine
__pycache__/
GIT_EOF

# 10. Primer Commit Local
git add .
git commit -m "feat: stack C++20 + Flask + Docker + GHCR"

echo "✅ Código empaquetado en ~/iaabismalhellfire con Git activo."
