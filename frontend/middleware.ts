import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('miinapi-auth')
  const { pathname } = request.nextUrl

  // Rutas protegidas
  const protectedRoutes = [
    '/inicio', '/solicitudes', '/notificaciones',
    '/certificados', '/soporte', '/biblioteca',
    '/perfil', '/chat', '/diario-oficial',
  ]

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si ya está autenticado e intenta ir al login, redirigir al inicio
  if (pathname === '/login' && authCookie) {
    return NextResponse.redirect(new URL('/inicio', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/inicio/:path*', '/solicitudes/:path*', '/notificaciones/:path*',
    '/certificados/:path*', '/soporte/:path*', '/biblioteca/:path*',
    '/perfil/:path*', '/chat/:path*', '/diario-oficial/:path*', '/login',
  ],
}
