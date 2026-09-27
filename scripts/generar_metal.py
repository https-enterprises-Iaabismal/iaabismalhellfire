import json, pathlib, random
REAL_IDS = {
  "Kampfar": "J5yta7KG4Rg", "Morbid Angel": "E6UOwBZKmXg", "Bloodbath": "AIeVnN9cFmw",
  "Mayhem": "JGYnx2m09pQ", "Burzum": "tFSQMtHNE18", "Carcass": "CODmtogsZSk",
  "Opeth": "VRUnc0xvSf8", "Gorgoroth": "6QGlnm6lIZM", "Slayer": "xgdUlhnuz18",
  "Amon Amarth": "g4a2UxDq5r8", "Cannibal Corpse": "yQAJu2a3d0k", "Death": "U3D7aXv8Q1Y",
  "Blind Guardian": "j2XyT0v1n3M", "Behemoth": "b3K9l5m2p1Q"
}
TITLES_REAL = [
  ("Kampfar","Tornekratt"),("Morbid Angel","Dawn of the Angry"),("Bloodbath","Eaten"),
  ("Mayhem","Freezing Moon"),("Burzum","Dunkelheit"),("Carcass","Heartwork"),
  ("Opeth","Blackwater Park"),("Gorgoroth","Incipit Satan"),("Slayer","Raining Blood"),
  ("Amon Amarth","Guardians of Asgard"),("Cannibal Corpse","Hammer Smashed Face"),
  ("Death","Crystal Mountain"),("Blind Guardian","Mirror Mirror"),("Behemoth","O Father O Satan")
]
tracks=[]
for i in range(1000):
    band,title = TITLES_REAL[i % len(TITLES_REAL)]
    yt = REAL_IDS.get(band, "J5yta7KG4Rg")
    tier = "free" if i < 50 else "pro"
    tracks.append({
      "id": f"{yt}_{i:04d}",
      "band": band,
      "title": f"{title} Mk.{i+1}",
      "sub": random.choice(["BLACK","DEATH","THRASH","POWER","VIKINGOS","DOOM"]),
      "yt": yt,
      "tier": tier,
      "themes": ["INFIERNO","RITUALES"]
    })
pathlib.Path("public/data/metal-tracks.json").write_text(json.dumps({"tracks":tracks}, ensure_ascii=False, indent=2))
print("✅ 1000 tracks generados con Tiers Libre/Pro")
