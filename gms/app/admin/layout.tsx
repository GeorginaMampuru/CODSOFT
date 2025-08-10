import { ReactNode } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/Sidebar'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('auth_user_id', user.id)
    .maybeSingle()
  const role = (data as any)?.roles?.name as string | null
  if (role !== 'admin') redirect('/')
  return (
    <div className="flex gap-6">
      {/* @ts-ignore role narrowing */}
      <Sidebar role={role || 'admin'} />
      <div className="flex-1">{children}</div>
    </div>
  )
}