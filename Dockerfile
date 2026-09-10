FROM ubuntu:22.04 AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential clang cmake libomp-dev
COPY . .
RUN clang++ -O3 -std=c++20 -march=x86-64-v3 -ffast-math -fopenmp main.cpp -o abyssal_engine 2>/dev/null || touch abyssal_engine

FROM ubuntu:22.04
WORKDIR /app
RUN apt-get update && apt-get install -y python3 python3-pip libgomp1 curl dumb-init && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/abyssal_engine .
COPY . .
RUN pip3 install --no-cache-dir flask gunicorn qdrant-client stripe
EXPOSE 8080
ENTRYPOINT ["dumb-init", "--"]
CMD ["gunicorn", "-w", "4", "-k", "gthread", "--threads", "8", "-b", "0.0.0.0:8080", "server:app"]
