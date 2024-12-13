// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function middleware(request: NextRequest){
  const cookie = request.cookies.get("__Host-next-auth.session-token");
  // Mengambil token JWT dari cookies
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  console.log('Environment:', process.env.NODE_ENV);
  console.log('Full Cookies:', cookie);
  console.log('token :',token)
  console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET);
  const url = request.nextUrl.pathname;

  // Mengecualikan API dan halaman login dari pemeriksaan
  if (url.startsWith('/api/') || url.startsWith('/login')) {
    return NextResponse.next(); // API dan halaman login tidak memerlukan pemeriksaan
  }

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika user mencoba mengakses dashboard atau subpathnya, periksa apakah dia memiliki invitation_id
  if (url.startsWith('/dashboard')) {
    const userId = token.id;
    // Query ke tabel invitation untuk memeriksa apakah user sudah memiliki invitation_id
    console.log(userId)
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/invitation?userId=${userId}`)
    const data = await response.json()

    // Jika tidak ada invitation_id, arahkan ke halaman /add-invitation
    if (!data) {
      return NextResponse.redirect(new URL('/form-template', request.url));
    }
  }

  // Jika semuanya valid, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/bjir'],
   // Menangani semua route yang dimulai dengan /dashboard, termasuk subpath seperti /dashboard/invitation
};
