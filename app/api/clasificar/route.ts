import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, band } = await req.json();
  const prompt = `Clasifica esta rola: ${band} - ${title}. Devuelve SOLO JSON: {"sub":"black|thrash|death|doom|abismal","year":1990,"riffs":0,"produccion":0}`;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    return NextResponse.json(JSON.parse(text));
  } catch (e) {
    return NextResponse.json({ sub: "black", year: 1994, riffs: 9 });
  }
}
