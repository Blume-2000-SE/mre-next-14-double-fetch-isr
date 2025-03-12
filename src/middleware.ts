import { NextRequest, NextResponse } from 'next/server';


export default async function middleware(req: NextRequest) {
  const originDomain = req.headers.get('x-origin-domain') || 'unbekannt';

  const response = NextResponse.next();
  response.headers.set('x-origin-domain', originDomain);

  return response;
}

export const config = {
  matcher: [
    '/',
    '/:path*',
    '/((?!_next|_vercel|og-image|favicon.ico).*)'
  ]
};
