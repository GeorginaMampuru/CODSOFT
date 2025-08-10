import Link from 'next/link'

export default function SalesDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link href="/sales/leads" className="border rounded p-4 hover:shadow">
        <div className="text-lg font-semibold">Leads</div>
        <div className="text-sm text-neutral-600">Track leads and customers</div>
      </Link>
      <Link href="/sales/projects" className="border rounded p-4 hover:shadow">
        <div className="text-lg font-semibold">Projects</div>
        <div className="text-sm text-neutral-600">Manage project timelines</div>
      </Link>
    </div>
  )
}