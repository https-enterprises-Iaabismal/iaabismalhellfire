export async function GET() {
  const baseUrl = "https://iaabismalhellfire.vercel.app";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>IA ABISMAL HELLFIRE - Metal Feed</title>
  <link>${baseUrl}/feed/metal</link>
  <description>Reactor C++ a 11,000M - Death Metal Industrial</description>
  <language>es-mx</language>
  <pubDate>Sat, 10 Oct 2026 01:20:20 +0000</pubDate>
  <itunes:explicit>true</itunes:explicit>
  <item>
    <title>DEPTHS 11000M - THE CORE BREACH</title>
    <description><![CDATA[LANZAMIENTO OFICIAL DEATH METAL - https-enterprises-Iaabismal]]></description>
    <link>${baseUrl}/releases/core-breach</link>
    <guid>core-breach-2026</guid>
    <pubDate>Sat, 10 Oct 2026 01:20:20 +0000</pubDate>
    <enclosure url="${baseUrl}/covers/ia_abismal_hellfire_album_cover.webp" type="image/webp" />
    <media:content url="${baseUrl}/covers/ia_abismal_hellfire_vertical.webp" medium="image" />
  </item>
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" } });
}
