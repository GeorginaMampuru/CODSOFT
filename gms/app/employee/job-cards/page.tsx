import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function EmployeeJobCardsPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: employee } = await supabase.from('employees').select('id').eq('auth_user_id', user!.id).maybeSingle()
  const { data: cards } = await supabase
    .from('job_cards')
    .select('id, description, status')
    .eq('employee_id', employee?.id)
    .order('id', { ascending: false })

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Job Cards</h1>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {cards?.map((c) => (
              <tr key={c.id} className="border-t">
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