from flask import Flask, Response
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def feed(path):
    xml = """<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>IA ABISMAL HELLFIRE - Metal Feed</title>
  <link>https://iaabismalhellfire.vercel.app/feed/metal</link>
  <description>Reactor C++ a 11,000M - Death Metal Industrial - https-enterprises-Iaabismal</description>
  <language>es-mx</language>
  <itunes:explicit>true</itunes:explicit>
  <image>
    <url>https://iaabismalhellfire.vercel.app/covers/ia_abismal_hellfire_album_cover.webp</url>
    <title>DEPTHS 11000M - THE CORE BREACH</title>
    <link>https://iaabismalhellfire.vercel.app/releases/core-breach</link>
  </image>
  <item>
    <title>DEPTHS 11000M - THE CORE BREACH</title>
    <description><![CDATA[LANZAMIENTO OFICIAL DEATH METAL - Reactor C++ colapsando a 11,000M - Grabado en Termux - https-enterprises-Iaabismal]]></description>
    <link>https://iaabismalhellfire.vercel.app/releases/core-breach</link>
    <guid>core-breach-2026</guid>
    <pubDate>Thu, 09 Oct 2026 00:00:00 GMT</pubDate>
    <enclosure url="https://iaabismalhellfire.vercel.app/covers/ia_abismal_hellfire_album_cover.webp" type="image/webp" />
  </item>
</channel>
</rss>"""
    return Response(xml, mimetype='application/rss+xml', headers={"Access-Control-Allow-Origin":"*"})

# Vercel necesita esto
app = app
