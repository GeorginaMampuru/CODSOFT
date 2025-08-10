import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminJobsPage() {
  const supabase = createSupabaseServerClient()
  await supabase.rpc('noop')
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Job Advertisements</h1>
      <p className="text-sm text-neutral-600">Coming soon. Admins will be able to post and manage job ads.</p>
    </div>
  )
}