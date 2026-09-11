import { NextRequest, NextResponse } from 'next/server';
import { crearPreferenciaMP } from '@/lib/mercadopago';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
export async function POST(req: NextRequest) {
  try {
    const { titulo, precioARS, videoId, email } = await req.json();
    if (!titulo || !precioARS || !videoId) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    await supabase.from('pagos').insert({ video_id: videoId, titulo, monto: precioARS, moneda: 'ARS', estado: 'pendiente' });
    const pref = await crearPreferenciaMP({ titulo, precioARS, videoId, emailComprador: email });
    return NextResponse.json({ id: pref.id, init_point: pref.init_point, sandbox_init_point: pref.sandbox_init_point });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
