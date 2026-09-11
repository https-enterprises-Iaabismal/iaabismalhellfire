import { NextResponse } from 'next/server';
export async function POST(){
  return NextResponse.json({ 
    id: 'test_123',
    init_point: 'https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=TEST-MX-100',
    mensaje: 'Build MX OK - escalera $100'
  });
}
