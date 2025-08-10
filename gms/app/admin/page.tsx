import Link from 'next/link'

export default function AdminDashboard() {
  const cards = [
    { href: '/admin/users', title: 'Users', description: 'Create and manage employees' },
    { href: '/admin/attendance', title: 'Attendance', description: 'Track and approve attendance' },
    { href: '/admin/leave', title: 'Leave Requests', description: 'Approve or reject leave' },
    { href: '/admin/invoices', title: 'Invoices', description: 'Manage invoices' },
    { href: '/admin/quotations', title: 'Quotations', description: 'Manage quotations' },
    { href: '/admin/jobs', title: 'Job Ads', description: 'Post and manage job advertisements' },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="border rounded p-4 hover:shadow">
          <div className="text-lg font-semibold">{c.title}</div>
          <div className="text-sm text-neutral-600">{c.description}</div>
        </Link>
      ))}
    </div>
  )
}