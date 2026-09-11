import { NextRequest, NextResponse } from 'next/server';
import { crearPreferenciaMP } from '@/lib/mercadopago';
export async function POST(req: NextRequest) {
  try {
    const { titulo, precioMXN, videoId, email } = await req.json();
    if (!titulo || !precioMXN || !videoId) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    const pref = await crearPreferenciaMP({ titulo, precioMXN, videoId, emailComprador: email });
    return NextResponse.json({ id: pref.id, init_point: pref.init_point, sandbox_init_point: pref.sandbox_init_point });
  } catch (e:any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
