'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function assignJobCard(formData: FormData) {
  const employee_id = Number(formData.get('employee_id'))
  const description = String(formData.get('description') || '')
  const supabase = createSupabaseServerClient()
  await supabase.from('job_cards').insert({ employee_id, description })
  redirect('/admin/job-cards')
}