import "./globals.css";
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Animal Encyclopedia',
  description: 'An Internet Programming Project by Prohor Muchev 5515.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="site-wrapper">
          <header className="main-header">
            <h1 className="site-title">Animal Encyclopedia</h1>
            <nav className="main-nav">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/animals">Animals</Link></li>
                <li><Link href="/users">Users</Link></li>
                <li><Link href="/comments">Comments</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            {children}
          </main>
          <footer className="main-footer">
            <p>© 2024 Animal Encyclopedia. Made by Prohor Muchev 5515.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}