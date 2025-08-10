import { createSupabaseServerClient } from '@/lib/supabase/server'
import { assignJobCard } from './submit'

export default async function AdminJobCardsPage() {
  const supabase = createSupabaseServerClient()
  const { data: employees } = await supabase.from('employees').select('id, name, code').order('name')
  const { data: cards } = await supabase
    .from('job_cards')
    .select('id, description, status, employees(name, code)')
    .order('id', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Job Cards</h1>
      <form action={assignJobCard} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select name="employee_id" className="border rounded px-3 py-2" required>
          <option value="">Select employee</option>
          {employees?.map((e) => (
            <option key={e.id} value={e.id}>{e.name} ({e.code})</option>
          ))}
        </select>
        <input name="description" placeholder="Description" className="border rounded px-3 py-2" required />
        <button className="bg-[#d80001] text-white rounded px-4 py-2">Assign</button>
      </form>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">Employee</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {cards?.map((c: any) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.employees?.name} ({c.employees?.code})</td>
                <td className="p-2">{c.description}</td>
                <td className="p-2">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}