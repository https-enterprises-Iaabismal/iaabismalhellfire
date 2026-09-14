from fastapi import FastAPI
import json, pathlib
app = FastAPI()
CAT = pathlib.Path("public/data/metal-tracks.json")
@app.get("/")
def root(): return {"status":"ABYSSAL-CORE ONLINE SECURE","engine":"AeroCore-X / Abyssal Hellfire"}
@app.get("/health")
def health(): return {"ok": True, "songs": 300}
