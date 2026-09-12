import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
  // Tu email = acceso total sin pagar
  const email = req.cookies.get('user_email')?.value || '';
  const isOwner = email.toLowerCase().includes('armando');
  if(isOwner){
    const res = NextResponse.next();
    res.headers.set('x-owner', 'Armando Adán Campos Velázquez');
    return res;
  }
  return NextResponse.next();
}
export const config = { matcher: ['/feed/:path*', '/critic/:path*'] };
