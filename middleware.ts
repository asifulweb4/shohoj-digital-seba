import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'shohoj-digital-seba-secret-key-2024')

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value

    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
    const isAdmin = request.nextUrl.pathname.startsWith('/admin')
    const isAuth = request.nextUrl.pathname.startsWith('/auth')

    if (isDashboard || isAdmin) {
        if (!session) return NextResponse.redirect(new URL('/auth/login', request.url))
        
        try {
            const { payload } = await jwtVerify(session, SECRET)
            if (isAdmin && (payload as any).role !== 'admin') {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        } catch (err) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    if (isAuth && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
}