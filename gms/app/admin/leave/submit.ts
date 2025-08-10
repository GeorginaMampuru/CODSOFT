'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function setLeaveStatus(formData: FormData) {
  const id = Number(formData.get('id'))
  const status = String(formData.get('status'))
  const supabase = createSupabaseServerClient()
  await supabase.from('leave_requests').update({ status }).eq('id', id)
  redirect('/admin/leave')
}