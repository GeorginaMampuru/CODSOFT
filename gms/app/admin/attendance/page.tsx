import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminAttendancePage() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase
    .from('attendance')
    .select('id, date, hours_worked, overtime_hours, employees(name, code)')
    .order('date', { ascending: false })
    .limit(200)

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Attendance</h1>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Employee</th>
              <th className="text-left p-2">Hours</th>
              <th className="text-left p-2">Overtime</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((r: any) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.employees?.name} ({r.employees?.code})</td>
                <td className="p-2">{r.hours_worked}</td>
                <td className="p-2">{r.overtime_hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}