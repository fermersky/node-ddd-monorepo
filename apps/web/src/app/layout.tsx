import type { Metadata } from 'next'
import '@/app/ui/globals.css'
import { futura, inter } from './ui/fonts'


export const metadata: Metadata = {
  title: 'Drivers list',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={futura.className}>{children}</body>
    </html>
  )
}
