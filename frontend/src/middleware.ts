import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { JWT } from 'next-auth/jwt';

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth?.token as JWT | null;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (req.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/landlord/:path*'],
};
