FROM ubuntu:22.04 AS builder
RUN apt-get update && apt-get install -y clang libomp-dev
WORKDIR /app
COPY *.cpp ./
RUN clang++ -O3 -std=c++20 -march=x86-64-v3 -ffast-math -fopenmp abyssal_engine.cpp -o abyssal_engine 2>/dev/null || clang++ -O3 -std=c++20 -march=x86-64-v3 -ffast-math -fopenmp main.cpp -o abyssal_engine

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y python3 python3-pip libgomp1 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/abyssal_engine .
COPY server.py requirements.txt ./
COPY *.pte ./ 2>/dev/null || true
RUN pip3 install flask gunicorn fastapi uvicorn qdrant-client stripe
EXPOSE 8080
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8080", "server:app"]
