import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.type === 'payment') {
    const payment = new Payment(client);
    const data = await payment.get({ id: body.data.id });
    if (data.status === 'approved') {
      const videoId = data.metadata?.video_id || data.metadata?.videoId;
      await supabase.from('pagos').update({ estado: 'aprobado', mp_payment_id: String(data.id), payer_email: data.payer?.email }).eq('video_id', videoId);
    }
  }
  return NextResponse.json({ ok: true });
}
