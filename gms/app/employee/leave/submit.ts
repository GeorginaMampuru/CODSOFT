'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function requestLeave(formData: FormData) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')
  const { data: employee } = await supabase.from('employees').select('id').eq('auth_user_id', user.id).maybeSingle()
  if (!employee) return redirect('/employee/leave?error=no-employee')
  const start_date = String(formData.get('start_date') || '')
  const end_date = String(formData.get('end_date') || '')
  const reason = String(formData.get('reason') || '')
  await supabase.from('leave_requests').insert({ employee_id: employee.id, start_date, end_date, reason })
  redirect('/employee/leave')
}