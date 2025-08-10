import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

async function fetchPrimaryRole(): Promise<string | null> {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('auth_user_id', user.id)
    .limit(1)
    .maybeSingle()
  // @ts-ignore nested select
  return data?.roles?.name ?? null
}

export default async function HomePage() {
  const role = await fetchPrimaryRole()
  if (!role) redirect('/login')
  if (role === 'admin') redirect('/admin')
  redirect('/employee')
}