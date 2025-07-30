import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/components/SupabaseProvider'
import BottomNav from "@/components/BottomNav"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Viver Saudável',
  description: 'Portal de e-books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
        <BottomNav />
      </body>
    </html>
  )
}
