import { login } from './submit'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto border rounded-lg p-6 bg-white text-black dark:bg-neutral-900 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form action={login} className="space-y-4">
        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input className="w-full border rounded px-3 py-2" id="email" name="email" type="email" required />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="password">Password</label>
          <input className="w-full border rounded px-3 py-2" id="password" name="password" type="password" required />
        </div>
        <button className="w-full bg-[#d80001] text-white rounded px-4 py-2">Sign in</button>
      </form>
      <p className="text-xs text-neutral-600 mt-4">Having trouble? Contact your administrator.</p>
      <div className="mt-4 text-sm">
        <Link className="underline" href="/">Back</Link>
      </div>
    </div>
  )
}