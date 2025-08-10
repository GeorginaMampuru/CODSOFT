import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function PayslipsPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: employee } = await supabase.from('employees').select('id').eq('auth_user_id', user!.id).maybeSingle()
  const { data: payslips } = await supabase
    .from('payslips')
    .select('id, month, year, net_pay, pdf_url')
    .eq('employee_id', employee?.id)
    .order('year', { ascending: false })
    .order('month', { ascending: false })

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Payslips</h1>
      <div className="border rounded divide-y">
        {payslips?.map((p) => (
          <div key={p.id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.month}/{p.year}</div>
              <div className="text-sm text-neutral-600">Net pay: {p.net_pay}</div>
            </div>
            {p.pdf_url && (
              <a className="text-[#d80001] underline" href={p.pdf_url} target="_blank">Download PDF</a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}