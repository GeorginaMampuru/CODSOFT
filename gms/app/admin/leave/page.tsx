import { createSupabaseServerClient } from '@/lib/supabase/server'
import { setLeaveStatus } from './submit'

export default async function AdminLeavePage() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase
    .from('leave_requests')
    .select('id, start_date, end_date, reason, status, employees(name)')
    .order('id', { ascending: false })
    .limit(200)

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Leave Requests</h1>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-2">Employee</th>
              <th className="text-left p-2">Dates</th>
              <th className="text-left p-2">Reason</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((r: any) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.employees?.name}</td>
                <td className="p-2">{r.start_date} → {r.end_date}</td>
                <td className="p-2">{r.reason}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">
                  <form action={setLeaveStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={r.id} />
                    <button name="status" value="approved" className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
                    <button name="status" value="rejected" className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}