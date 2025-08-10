import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function InventoryItemsPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data } = await supabase.from('user_roles').select('roles(name)').eq('auth_user_id', user.id).maybeSingle()
  const role = (data as any)?.roles?.name as string | null
  if (!(role === 'admin' || role === 'stock_manager')) redirect('/')

  const { data: items } = await supabase.from('inventory_items').select('id, name, sku, quantity, unit').order('name')

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Inventory</h1>
      <form action={async (fd: FormData) => {
        'use server'
        const admin = createSupabaseServerClient()
        await admin.from('inventory_items').insert({
          name: String(fd.get('name')||''),
          sku: String(fd.get('sku')||''),
          quantity: Number(fd.get('quantity')||0),
          unit: String(fd.get('unit')||'unit'),
        })
        redirect('/stock-manager/items')
      }} className="flex gap-2">
        <input name="name" placeholder="Item name" className="border rounded px-3 py-2" required />
        <input name="sku" placeholder="SKU" className="border rounded px-3 py-2" />
        <input name="quantity" type="number" step="1" placeholder="Qty" className="border rounded px-3 py-2 w-28" />
        <input name="unit" placeholder="Unit" className="border rounded px-3 py-2 w-28" />
        <button className="bg-[#d80001] text-white rounded px-4 py-2">Add</button>
      </form>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Qty</th>
              <th className="p-2 text-left">Unit</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.name}</td>
                <td className="p-2">{i.sku}</td>
                <td className="p-2">{i.quantity}</td>
                <td className="p-2">{i.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}