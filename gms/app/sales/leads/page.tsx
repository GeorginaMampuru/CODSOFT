import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function LeadsPage() {
  const supabase = createSupabaseServerClient()
  const { data: leads } = await supabase.from('crm_leads').select('id, name, contact, status').order('id', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Leads</h1>
      <form action={async (fd: FormData) => {
        'use server'
        const db = createSupabaseServerClient()
        await db.from('crm_leads').insert({
          name: String(fd.get('name')||''),
          contact: String(fd.get('contact')||''),
        })
      }} className="flex gap-2">
        <input name="name" placeholder="Name" className="border rounded px-3 py-2" required />
        <input name="contact" placeholder="Contact" className="border rounded px-3 py-2" />
        <button className="bg-[#d80001] text-white rounded px-4 py-2">Add</button>
      </form>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.name}</td>
                <td className="p-2">{l.contact}</td>
                <td className="p-2">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}