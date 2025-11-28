import { NextResponse } from 'next/server';
import { shouldRedirectToCanonical, normalizeToCanonicalDomain, getPreferredDomainHost } from './app/lib/seo';

export function middleware(request) {
  const { pathname, search, hash } = request.nextUrl;
  const host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  
  // Check if we need to redirect to canonical domain
  if (shouldRedirectToCanonical(host, protocol)) {
    const canonicalUrl = normalizeToCanonicalDomain(`${protocol}://${host}${pathname}${search}${hash}`);
    
    // Permanent redirect (301) for SEO - this tells search engines to use the canonical domain
    return NextResponse.redirect(canonicalUrl, {
      status: 301,
      headers: {
        // Add headers to help with SEO
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  
  // Ensure HTTPS (optional, but recommended)
  if (protocol !== 'https' && process.env.NODE_ENV === 'production') {
    const httpsUrl = request.nextUrl.clone();
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, {
      status: 301,
    });
  }
  
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
};

