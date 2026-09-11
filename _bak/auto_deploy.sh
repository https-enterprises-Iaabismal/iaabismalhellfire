#!/bin/bash
set -e

echo "=== [1/3] Sincronizando Git en segundo plano ==="
git add .
git commit -m "auto: deploy automático $(date +'%Y-%m-%d %H:%M:%S')" || true
git push origin main || echo "Push omitido o no configurado."

echo "=== [2/3] Levantando Contenedores y Servicios ==="
if command -v docker-compose &> /dev/null; then
    docker-compose up -d --build
elif command -v docker &> /dev/null; then
    docker compose up -d --build
else
    echo "Docker no detectado, usando ejecución directa..."
    nohup python3 server.py > server.log 2>&1 &
fi

echo "=== [3/3] Sistema Abismal Operativo 24/7 ==="
echo "Todo corriendo. Ya te puedes ir a dormir tranquilo."
