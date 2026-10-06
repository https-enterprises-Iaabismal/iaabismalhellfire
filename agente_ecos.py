#!/usr/bin/env python3
import csv, time, requests, subprocess, os, json
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi

VIDEOS = ["_RSmH8Nzffo","dQw4w9WgXcQ"] # prueba con uno famoso que sí tiene subs
HILOS = ["poder","elite","control","dinero","IA","blockchain","chip","religion"]

def get_api(vid):
    api = YouTubeTranscriptApi()
    f = api.fetch(vid, languages=['es','en'])
    return " ".join([s.text for s in f])

def get_piped(vid):
    # Piped no está baneado, usa otra IP
    r = requests.get(f"https://pipedapi.kavin.rocks/captions/{vid}", timeout=15).json()
    # agarra el primer subtitulo en es o en
    url = None
    for c in r:
        if c.get('languageCode','').startswith('es') or c.get('languageCode','').startswith('en'):
            url = c.get('url')
            break
    if not url: url = r[0]['url']
    txt = requests.get(url, timeout=15).text
    return txt[:5000]

def get_ytdlp_android(vid):
    url = f"https://www.youtube.com/watch?v={vid}"
    # cliente android bypasea el bloqueo de IP
    subprocess.run([
        "yt-dlp","--extractor-args","youtube:player_client=android",
        "--write-auto-subs","--sub-langs","es,en",
        "--skip-download","--sub-format","vtt",
        "-o",f"{vid}.%(ext)s", url
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for fn in os.listdir("."):
        if fn.startswith(vid) and fn.endswith(".vtt"):
            with open(fn,'r',encoding='utf-8', errors='ignore') as f:
                content = f.read()
            os.remove(fn)
            return content
    return ""

def get_text(vid):
    for func in [get_api, get_piped, get_ytdlp_android]:
        try:
            txt = func(vid)
            if txt and len(txt) > 100:
                print(f"OK {vid} con {func.__name__}")
                return txt
        except Exception as e:
            print(f"fallo {func.__name__} en {vid}: {e}")
            time.sleep(1)
    return ""

rows=[]
for vid in VIDEOS:
    txt = get_text(vid)
    if not txt:
        print(f"SKIP {vid}")
        continue
    h = ", ".join([x for x in HILOS if x in txt.lower()]) or "general"
    rows.append({"video_id":vid,"fecha":datetime.now().strftime("%Y-%m-%d"),"hilos":h,"idea":f"Como el poder usa {h}","txt":txt[:800].replace("\n"," ")})
    time.sleep(3)

# SIEMPRE crea el CSV aunque esté vacío, para que no te de ls error
with open('cerebro_ecos.csv','w',newline='',encoding='utf-8') as f:
    if rows:
        w=csv.DictWriter(f, fieldnames=rows[0].keys())
        w.writeheader()
        w.writerows(rows)
    else:
        f.write("video_id,fecha,hilos,idea,txt\n")
        f.write("vacio,0,ip_baneada,cambia_ip,0\n")

print(f"\nListo. CSV en: ~/iaabismalhellfire/cerebro_ecos.csv ({len(rows)} filas)")
