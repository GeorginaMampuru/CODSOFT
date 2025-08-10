'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { differenceInMinutes } from 'date-fns'

export async function clock(formData: FormData) {
  const mode = String(formData.get('mode') || 'in')
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data: employee } = await supabase.from('employees').select('id').eq('auth_user_id', user.id).maybeSingle()
  if (!employee) return

  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  const { data: existing } = await supabase
    .from('attendance')
    .select('*')
    .eq('employee_id', employee.id)
    .eq('date', todayStr)
    .maybeSingle()

  if (mode === 'in') {
    if (!existing) {
      await supabase.from('attendance').insert({ employee_id: employee.id, date: todayStr, clock_in: today.toISOString() })
    }
  } else {
    if (existing && !existing.clock_out) {
      const clockIn = new Date(existing.clock_in)
      const minutes = Math.max(0, differenceInMinutes(today, clockIn))
      const hoursWorked = minutes / 60
      const overtimeHours = Math.max(0, hoursWorked - 8)
      await supabase
        .from('attendance')
        .update({ clock_out: today.toISOString(), hours_worked: hoursWorked, overtime_hours: overtimeHours })
        .eq('id', existing.id)
    }
  }
}