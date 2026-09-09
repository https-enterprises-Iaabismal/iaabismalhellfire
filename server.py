from flask import Flask, jsonify, request
import subprocess, os

app = Flask(__name__)
MODEL = os.getenv("MODEL_PATH", "abyssal_model.pte")

@app.get("/")
def home():
    return jsonify({"engine": "AbyssalEngine AeroCore-X", "status": "online", "model": MODEL})

@app.post("/predict")
def predict():
    result = subprocess.run(["./abyssal_engine", MODEL], capture_output=True, text=True, timeout=10)
    return jsonify({"output": result.stdout, "error": result.stderr})

@app.get("/bench")
def bench():
    result = subprocess.run(["./abyssal_engine", MODEL], capture_output=True, text=True, timeout=15)
    return jsonify({"telemetria": result.stdout})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
