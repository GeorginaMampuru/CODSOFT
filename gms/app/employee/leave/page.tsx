import { createSupabaseServerClient } from '@/lib/supabase/server'
import { requestLeave } from './submit'

export default async function EmployeeLeavePage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: employee } = await supabase.from('employees').select('id').eq('auth_user_id', user!.id).maybeSingle()
  const { data: leaves } = await supabase
    .from('leave_requests')
    .select('id, start_date, end_date, reason, status')
    .eq('employee_id', employee?.id)
    .order('id', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Leave</h1>
      <form action={requestLeave} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input name="start_date" type="date" className="border rounded px-3 py-2" required />
        <input name="end_date" type="date" className="border rounded px-3 py-2" required />
        <input name="reason" placeholder="Reason" className="border rounded px-3 py-2 md:col-span-1" />
        <button className="bg-[#d80001] text-white rounded px-4 py-2 md:col-span-3">Request Leave</button>
      </form>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">Dates</th>
              <th className="p-2 text-left">Reason</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves?.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.start_date} → {l.end_date}</td>
                <td className="p-2">{l.reason}</td>
                <td className="p-2">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}