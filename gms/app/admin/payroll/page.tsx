import { generatePayroll } from './submit'

export default function AdminPayrollPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Payroll</h1>
      <form action={generatePayroll} className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-sm">Month</label>
          <input name="month" type="number" min={1} max={12} className="border rounded px-3 py-2 w-28" required />
        </div>
        <div>
          <label className="block text-sm">Year</label>
          <input name="year" type="number" min={2000} className="border rounded px-3 py-2 w-32" required />
        </div>
        <button className="bg-[#d80001] text-white rounded px-4 py-2">Generate Payslips</button>
      </form>
      <p className="text-sm text-neutral-600">This will calculate base + overtime - taxes and upload PDF payslips to Storage.</p>
    </div>
  )
}