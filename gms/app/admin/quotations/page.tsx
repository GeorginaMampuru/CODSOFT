import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminQuotationsPage() {
  const supabase = createSupabaseServerClient()
  const { data: quotations } = await supabase.from('quotations').select('id, customer, amount, status, issued_at').order('id', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Quotations</h1>
      <form action={async (fd: FormData) => {
        'use server'
        const db = createSupabaseServerClient()
        await db.from('quotations').insert({
          customer: String(fd.get('customer')||''),
          amount: Number(fd.get('amount')||0),
        })
      }} className="flex gap-2">
        <input name="customer" placeholder="Customer" className="border rounded px-3 py-2" required />
        <input name="amount" type="number" step="0.01" placeholder="Amount" className="border rounded px-3 py-2" required />
        <button className="bg-[#d80001] text-white rounded px-4 py-2">Add</button>
      </form>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Issued</th>
            </tr>
          </thead>
          <tbody>
            {quotations?.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.customer}</td>
                <td className="p-2">{i.amount}</td>
                <td className="p-2">{i.status}</td>
                <td className="p-2">{String(i.issued_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}