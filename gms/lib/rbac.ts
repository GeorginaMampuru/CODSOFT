export type AppRole = 'admin' | 'employee' | 'hr' | 'accounts' | 'stock_manager' | 'manufacturing' | 'sales'

export const ALL_ROLES: AppRole[] = ['admin', 'employee', 'hr', 'accounts', 'stock_manager', 'manufacturing', 'sales']

export function isAdmin(role?: string | null): boolean {
  return role === 'admin'
}

export function canAccessRoute(role: string | null, pathname: string): boolean {
  if (!role) return false
  if (pathname.startsWith('/admin')) return role === 'admin'
  if (pathname.startsWith('/stock-manager')) return role === 'admin' || role === 'stock_manager'
  if (pathname.startsWith('/sales')) return role === 'admin' || role === 'sales'
  if (pathname.startsWith('/employee')) return role === 'employee' || role === 'admin'
  return true
}