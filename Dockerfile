FROM ubuntu:22.04 as builder
RUN apt-get update && apt-get install -y clang cmake ninja-build libomp-dev
WORKDIR /app
COPY main.cpp .
RUN clang++ -O3 -std=c++20 -march=x86-64-v3 -ffast-math -fopenmp main.cpp -o abyssal_engine

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y python3 python3-pip libgomp1 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/abyssal_engine .
COPY server.py requirements.txt ./
COPY *.pte ./ 2>/dev/null || true
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "server:app"]
