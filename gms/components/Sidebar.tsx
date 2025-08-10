"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type AppRole } from '@/lib/rbac'
import { Home, Users, Clock, FileText, Package, Briefcase, ClipboardList, LogOut } from 'lucide-react'

export function Sidebar({ role }: { role: AppRole }) {
  const pathname = usePathname()
  const item = (href: string, label: string, Icon: any) => (
    <Link href={href} className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname === href ? 'bg-neutral-100 dark:bg-neutral-800 font-medium' : ''}`}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
  return (
    <aside className="w-64 shrink-0 border-r p-3 hidden md:block">
      <div className="text-sm font-semibold mb-2">Navigation</div>
      <nav className="flex flex-col gap-1">
        {item('/', 'Home', Home)}
        {(role === 'admin') && (
          <>
            {item('/admin', 'Admin Dashboard', Users)}
            {item('/admin/users', 'Users', Users)}
            {item('/admin/attendance', 'Attendance', Clock)}
            {item('/admin/leave', 'Leave Requests', ClipboardList)}
            {item('/admin/invoices', 'Invoices', FileText)}
            {item('/admin/quotations', 'Quotations', FileText)}
            {item('/admin/jobs', 'Job Ads', Briefcase)}
          </>
        )}
        {(role === 'employee' || role === 'admin') && (
          <>
            {item('/employee', 'Employee Dashboard', Home)}
            {item('/employee/payslips', 'Payslips', FileText)}
            {item('/employee/job-cards', 'Job Cards', ClipboardList)}
          </>
        )}
        {(role === 'stock_manager' || role === 'admin') && (
          <>
            {item('/stock-manager/items', 'Inventory', Package)}
          </>
        )}
      </nav>
      <div className="mt-6">
        <form action="/logout" method="post">
          <button className="flex items-center gap-2 px-3 py-2 rounded bg-neutral-100 dark:bg-neutral-800 w-full text-left"><LogOut className="h-4 w-4" /> Logout</button>
        </form>
      </div>
    </aside>
  )
}