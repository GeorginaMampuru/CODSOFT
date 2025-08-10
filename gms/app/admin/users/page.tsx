import { createUser } from './submit'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function UsersPage() {
  const supabase = createSupabaseServerClient()
  const { data: employees } = await supabase
    .from('employees')
    .select('id, code, name, dept, designation, base_salary, auth_user_id')
    .order('name')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Create Employee/User</h1>
        <form action={createUser} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <input name="email" type="email" placeholder="Email" className="border rounded px-3 py-2" required />
          <input name="password" type="password" placeholder="Temp Password" className="border rounded px-3 py-2" required />
          <input name="name" placeholder="Full Name" className="border rounded px-3 py-2" required />
          <input name="code" placeholder="Employee Code" className="border rounded px-3 py-2" required />
          <input name="dept" placeholder="Department" className="border rounded px-3 py-2" />
          <input name="designation" placeholder="Designation" className="border rounded px-3 py-2" />
          <input name="base_salary" type="number" step="0.01" placeholder="Base Salary" className="border rounded px-3 py-2" />
          <select name="role" className="border rounded px-3 py-2">
            <option value="employee">employee</option>
            <option value="admin">admin</option>
            <option value="hr">hr</option>
            <option value="accounts">accounts</option>
            <option value="stock_manager">stock_manager</option>
            <option value="manufacturing">manufacturing</option>
            <option value="sales">sales</option>
          </select>
          <button className="bg-[#d80001] text-white rounded px-4 py-2 col-span-full">Create</button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Employees</h2>
        <div className="border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left p-2">Code</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Dept</th>
                <th className="text-left p-2">Designation</th>
                <th className="text-left p-2">Base Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-2">{e.code}</td>
                  <td className="p-2">{e.name}</td>
                  <td className="p-2">{e.dept}</td>
                  <td className="p-2">{e.designation}</td>
                  <td className="p-2">{e.base_salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}