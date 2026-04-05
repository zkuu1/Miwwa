import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // If accessing /admin route
  if (path.startsWith('/admin')) {
    // Not logged in → redirect to login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    // DEBUG: Remove these logs after fixing
    console.log('[Middleware] user.id:', user.id)
    console.log('[Middleware] profile:', profile)
    console.log('[Middleware] profileError:', profileError)

    if (!profile || profile.role !== 'admin') {
      // Logged in but not admin → redirect to homepage
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If logged-in user tries to access /login or /register → redirect to home
  if (user && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
