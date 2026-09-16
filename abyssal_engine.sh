#!/data/data/com.termux/files/usr/bin/bash
pkg install ffmpeg -y; mkdir -p /storage/emulated/0/Download/Abyssal_Pro
for f in *.mp3 *.wav *.flac; do [ -f "$f" ] || continue; echo "[ABYSSAL-CORE] $f"; ffmpeg -y -i "$f" -filter:a "loudness=I=-14:TP=-1.5:LRA=11,volume=1.5" -c:a libmp3lame -b:a 320k "/storage/emulated/0/Download/Abyssal_Pro/PRO_$f"; done
echo "Listo en Download/Abyssal_Pro"
