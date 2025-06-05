import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/api/admin');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');

  // Allow public API routes
  if (isApiRoute && !isAdminRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Add role check if needed
    // if (token.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Admin access required' },
    //     { status: 403 }
    //   );
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
  ],
}; 