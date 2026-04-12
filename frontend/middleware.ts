import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // En el futuro, esto será una sesión real de NextAuth o un JWT
  const isAuthenticated = request.cookies.get('miinapi-auth');
  
  // Lista de rutas protegidas
  const protectedRoutes = [
    '/inicio',
    '/solicitudes',
    '/notificaciones',
    '/certificados',
    '/soporte',
    '/biblioteca',
    '/perfil',
    '/chat',
    '/diario-oficial'
  ];

  const isProtectedRoute = protectedRoutes.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !isAuthenticated) {
    // Redirigir al login si intenta acceder a una ruta protegida sin auth
    const loginUrl = new URL('/login', request.url);
    // Opcional: guardar la URL de retorno
    // loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirigir al inicio si ya está autenticado e intenta ir al login
  if (request.nextUrl.pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/inicio', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se debe ejecutar el middleware
export const config = {
  matcher: [
    '/inicio/:path*',
    '/solicitudes/:path*',
    '/notificaciones/:path*',
    '/certificados/:path*',
    '/soporte/:path*',
    '/biblioteca/:path*',
    '/perfil/:path*',
    '/chat/:path*',
    '/diario-oficial/:path*',
    '/login'
  ]
};
