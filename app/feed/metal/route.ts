export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>IA ABISMAL HELLFIRE - METAL</title>
<link>https://iaabismalhellfire.vercel.app</link>
<description>Metal Abismal - Aerocore V2</description>
<language>es-mx</language>
<item>
<title>Oscuro Total - Aerocore V2</title>
<link>https://iaabismalhellfire.vercel.app</link>
<description>Motor de sonido nativo pesado envolvente con bajo de 35hz, distorsion 666 y reverb abismal</description>
<pubDate>${new Date().toUTCString()}</pubDate>
<guid>abismal-001</guid>
<enclosure url="https://iaabismalhellfire.vercel.app/aerocore-engine.js" type="application/javascript" />
</item>
<item>
<title>Metal Feed Fix</title>
<link>https://iaabismalhellfire.vercel.app/feed/metal</link>
<description>Feed arreglado</description>
<pubDate>${new Date().toUTCString()}</pubDate>
<guid>abismal-002</guid>
</item>
</channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
