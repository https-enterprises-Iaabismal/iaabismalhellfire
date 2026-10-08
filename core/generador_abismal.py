import json, pathlib, random
BANDS = {
    "BLACK": ["Mayhem","Darkthrone","Burzum","Immortal","Watain","Gorgoroth","Behemoth","Emperor","Marduk","1349","Satyricon","Enslaved"],
    "DEATH": ["Morbid Angel","Cannibal Corpse","Bloodbath","Deicide","Obituary","Death","Dying Fetus","Suffocation","Nile","Vader"],
    "THRASH": ["Slayer","Kreator","Sodom","Exodus","Destruction","Overkill","Testament","Sepultura","Annihilator","Metallica"],
    "DOOM": ["Opeth","Candlemass","Paradise Lost","Anathema","Katatonia","Swallow the Sun","Draconian","Novembers Doom"],
    "GRIND": ["Napalm Death","Carcass","Pig Destroyer","Terrorizer","Brutal Truth","Repulsion","Nasum","Rotten Sound"]
}
TITLES = ["Freezing Moon","Dunkelheit","Tornekratt","Raining Blood","Pleasure to Kill","Altars of Madness","Left Hand Path","Demigod","Evangelion","Theli"]
YT_POOL = ["J5yta7KG4Rg","xgdUlhnuz18","E6UOwBZKmXg","AIeVnN9cFmw","s2EJ1AqPIPg","JGYnx2m09pQ","tFSQMtHNE18","CODmtogsZSk","VRUnc0xvSf8","6QGlnm6lIZM"]
random.seed(2026)
used, tracks, i = set(), [], 0
while len(tracks) < 1000:
    sub = random.choice(list(BANDS.keys()))
    band = random.choice(BANDS[sub])
    base = random.choice(TITLES)
    title = base if f"{band}-{base}" not in used else f"{base} {random.choice(['Abismal','Nocturno','Ritual','Infernus','MMXXVI'])} {i}"
    key = f"{band}-{title}"
    if key in used:
        i += 1
        continue
    used.add(key)
    tracks.append({
        "id": f"{random.choice(YT_POOL)}_{len(tracks):04d}",
        "band": band,
        "title": title,
        "sub": sub,
        "year": random.randint(1985, 2026),
        "yt": random.choice(YT_POOL),
        "themes": [sub, random.choice(["MUERTE","SANGRE","DIABLO","RITUALES","INFIERNO","SATANISMO"])],
        "tier": "free" if len(tracks) < 100 else "pro"
    })
    i += 1
pathlib.Path("public/data/metal-tracks.json").write_text(json.dumps({"version":"5.1","engine":"AeroCore-X","total":len(tracks),"tracks":tracks}, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ [ABYSSAL-CORE] {len(tracks)} tracks generados en public/data/metal-tracks.json")
