import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import BottomNav from '@/components/BottomNav'
import SupabaseProvider from '@/components/SupabaseProvider'

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
      <body className={`${inter.className} relative`}>
        <SupabaseProvider>
          <Header /> {/* ✅ Agora o header aparece em todas as páginas */}
          <main className="pt-16">{children}</main> {/* padding-top para não cobrir o conteúdo */}
        </SupabaseProvider>
        <BottomNav /> {/* ✅ Navegação inferior aparece só no mobile */}
      </body>
    </html>
  )
}
