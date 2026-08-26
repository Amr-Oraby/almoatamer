import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    const claims = JSON.parse(json) as { exp?: number };
    return typeof claims.exp === "number" ? claims.exp : null;
  } catch {
    return null;
  }
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/profile', '/orders', '/messages', '/book-umrah/booking'];
  
  const locale = pathname.split('/')[1] || routing.defaultLocale;
  
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname === `/${locale}${route}` || pathname.startsWith(`/${locale}${route}/`)
  );

  if (isProtectedRoute) {
    const token = request.cookies.get('access_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/auth?error=unauthorized`, request.url));
    }

    const tokenExpiry = getTokenExpiry(token);
    const secondsUntilExpiry = tokenExpiry
      ? tokenExpiry - Math.floor(Date.now() / 1000)
      : null;

    if (secondsUntilExpiry !== null && secondsUntilExpiry <= 0) {
      return NextResponse.redirect(new URL(`/${locale}/auth?error=expired`, request.url));
    }
  }

  const authRoutes = ['/auth/login', '/auth/register', '/auth/forget-password', '/auth/verify', '/auth/reset-password', '/auth'];
  const isAuthRoute = authRoutes.some((route) => 
    pathname === `/${locale}${route}` || pathname.startsWith(`/${locale}${route}/`)
  );

  if (isAuthRoute) {
    const token = request.cookies.get('access_token')?.value;
    if (token) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    if (pathname === `/${locale}/auth/verify` || pathname.startsWith(`/${locale}/auth/verify/`)) {
      const pendingEmail = request.cookies.get('pending_verification_email')?.value;
      if (!pendingEmail) {
        return NextResponse.redirect(new URL(`/${locale}/auth/forget-password`, request.url));
      }
    }

    if (pathname === `/${locale}/auth/reset-password` || pathname.startsWith(`/${locale}/auth/reset-password/`)) {
      const resetGranted = request.cookies.get('password_reset_granted')?.value;
      if (!resetGranted) {
        return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
