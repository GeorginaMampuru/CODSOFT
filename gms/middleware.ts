import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const PROTECTED_PREFIXES = ['/admin', '/employee', '/stock-manager', '/sales']

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl
  let res = NextResponse.next()

  const needsAuth = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  if (!needsAuth) return res

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const loginUrl = new URL('/login', origin)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Fetch role
  const { data } = await supabase.from('user_roles').select('roles(name)').eq('auth_user_id', user.id).maybeSingle()
  const role = (data as any)?.roles?.name as string | null

  const deny = () => NextResponse.redirect(new URL('/', origin))

  if (pathname.startsWith('/admin') && role !== 'admin') return deny()
  if (pathname.startsWith('/stock-manager') && !(role === 'admin' || role === 'stock_manager')) return deny()
  if (pathname.startsWith('/sales') && !(role === 'admin' || role === 'sales')) return deny()
  if (pathname.startsWith('/employee') && !(role === 'employee' || role === 'admin')) return deny()

  return res
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
}