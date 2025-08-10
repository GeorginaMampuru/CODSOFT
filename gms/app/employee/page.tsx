import { createSupabaseServerClient } from '@/lib/supabase/server'
import { clock } from './submit'

export default async function EmployeeDashboard() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: employee } = await supabase.from('employees').select('id, name').eq('auth_user_id', user!.id).maybeSingle()

  const today = new Date().toISOString().slice(0, 10)
  const { data: attendance } = await supabase
    .from('attendance')
    .select('id, date, clock_in, clock_out')
    .eq('employee_id', employee?.id)
    .eq('date', today)
    .maybeSingle()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Welcome, {employee?.name}</h1>
      <form action={clock} className="flex items-center gap-3">
        <input type="hidden" name="mode" value={attendance?.clock_in && !attendance?.clock_out ? 'out' : 'in'} />
        <button className="bg-[#d80001] text-white rounded px-4 py-2">
          {attendance?.clock_in && !attendance?.clock_out ? 'Clock out' : 'Clock in'}
        </button>
        {attendance?.clock_in && attendance?.clock_out && (
          <span className="text-sm text-neutral-600">You have clocked out today.</span>
        )}
      </form>
    </div>
  )
}