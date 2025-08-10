import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function ProjectsPage() {
  const supabase = createSupabaseServerClient()
  const { data: projects } = await supabase.from('projects').select('id, title, status, start_date, end_date').order('id', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Projects</h1>
      <form action={async (fd: FormData) => {
        'use server'
        const db = createSupabaseServerClient()
        await db.from('projects').insert({
          title: String(fd.get('title')||''),
          start_date: String(fd.get('start_date')||''),
          end_date: String(fd.get('end_date')||''),
        })
      }} className="flex gap-2 flex-wrap items-end">
        <input name="title" placeholder="Title" className="border rounded px-3 py-2" required />
        <div>
          <label className="block text-sm">Start</label>
          <input name="start_date" type="date" className="border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm">End</label>
          <input name="end_date" type="date" className="border rounded px-3 py-2" />
        </div>
        <button className="bg-[#d80001] text-white rounded px-4 py-2">Add</button>
      </form>
      <div className="border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Start</th>
              <th className="p-2 text-left">End</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.status}</td>
                <td className="p-2">{String(p.start_date||'')}</td>
                <td className="p-2">{String(p.end_date||'')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}