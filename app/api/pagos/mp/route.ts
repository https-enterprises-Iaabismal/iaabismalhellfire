import { NextRequest, NextResponse } from 'next/server';
import { crearPreferenciaMP } from '../../../../lib/mercadopago';
export async function POST(req: NextRequest){
  try{
    const { titulo, precioMXN, videoId } = await req.json();
    const pref = await crearPreferenciaMP({ titulo, precioMXN, videoId });
    return NextResponse.json({ id: pref.id, init_point: pref.init_point });
  }catch(e:any){ return NextResponse.json({error:e.message},{status:500}); }
}
