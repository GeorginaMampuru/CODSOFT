import './globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <header className="header">
          <div className="container-page py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-wide">GMS</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/login" className="hover:underline">Login</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 bg-white dark:bg-black">
          <div className="container-page py-6">
            {children}
          </div>
        </main>
        <footer className="footer">
          <div className="container-page py-4 text-sm">© {new Date().getFullYear()} Gadou Management System</div>
        </footer>
      </body>
    </html>
  )
}