'use server'

import { redirect } from 'next/navigation'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function createUser(formData: FormData) {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  const name = String(formData.get('name') || '')
  const code = String(formData.get('code') || '')
  const dept = String(formData.get('dept') || '')
  const designation = String(formData.get('designation') || '')
  const baseSalary = Number(formData.get('base_salary') || 0)
  const role = String(formData.get('role') || 'employee')

  const admin = createSupabaseAdminClient()

  const { data: userRes, error: userErr } = await admin.auth.admin.createUser({ email, password, email_confirm: true })
  if (userErr || !userRes.user) {
    redirect(`/admin/users?error=${encodeURIComponent(userErr?.message || 'Failed to create user')}`)
  }
  const authUserId = userRes.user.id

  // Upsert role
  const { data: roleRow, error: roleErr } = await admin
    .from('roles')
    .upsert({ name: role }, { onConflict: 'name' })
    .select('id')
    .single()
  if (roleErr || !roleRow) {
    redirect(`/admin/users?error=${encodeURIComponent(roleErr?.message || 'Failed to upsert role')}`)
  }

  // Assign user role
  await admin.from('user_roles').upsert({ auth_user_id: authUserId, role_id: roleRow.id })

  // Create employee row
  await admin.from('employees').insert({ auth_user_id: authUserId, code, name, dept, designation, base_salary: baseSalary })

  redirect('/admin/users')
}