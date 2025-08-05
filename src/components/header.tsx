"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { type Database } from '@/types/supabase'
import { Menu, ShoppingCart, User, UserPlus, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"

type SubMenuItem = { title: string; href: string }
type MenuItem = { title: string; icon?: string; submenu: SubMenuItem[] }

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const supabase = useSupabaseClient<Database>()
  const session = useSession()
  const user = session?.user ?? null
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const menuItems: MenuItem[] = [
    {
      title: "E-books",
      icon: "/ebook.png",
      submenu: [{ title: "Biblioteca", href: "/e-books/biblioteca" }],
    },
    {
      title: "Audiobooks",
      icon: "/audiobook.png",
      submenu: [{ title: "Biblioteca", href: "/audiobooks/biblioteca" }],
    },
  ]

  return (
    <header className="futuristic-header fixed w-full top-0 z-50 hidden lg:block bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Viver Saudável"
            width={100}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center space-x-10">
          <nav className="flex items-center space-x-10">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                <button className="text-white/90 hover:text-cyan-400 flex items-center space-x-2">
                  {item.icon && <Image src={item.icon} alt={item.title} width={20} height={20} />}
                  <span className="font-medium">{item.title}</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-black/80 backdrop-blur-md rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.title}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-white/80 hover:bg-cyan-500/10"
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <nav className="flex items-center space-x-4">
            <Link href="#contato" className="text-white/90 hover:text-cyan-400">Contato</Link>
            <Link href="/carrinho" className="text-white/90 hover:text-cyan-400">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/60">Olá, {user.email?.split("@")[0]}</span>
                <Button onClick={handleSignOut} variant="ghost" size="icon">
                  <LogOut className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <Link href="/registro" className="text-white/90 hover:text-cyan-400">
                  <UserPlus className="w-5 h-5" />
                </Link>
                <Link href="/entrar" className="text-white/90 hover:text-cyan-400">
                  <User className="w-5 h-5" />
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* MENU MOBILE */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-black/90 text-white">
            <div className="mt-8 space-y-4">
              {menuItems.map((item) => (
                <Collapsible key={item.title}>
                  <CollapsibleTrigger className="flex justify-between w-full p-3 hover:bg-white/10">
                    <span>{item.title}</span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.title}
                        href={subitem.href}
                        onClick={() => setIsOpen(false)}
                        className="block p-2 hover:text-cyan-400"
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}

              <hr className="border-white/20" />

              <Link href="/#contato" onClick={() => setIsOpen(false)} className="block p-3 hover:text-cyan-400">
                Contato
              </Link>
              <Link href="/carrinho" onClick={() => setIsOpen(false)} className="block p-3 hover:text-cyan-400">
                <ShoppingCart className="inline-block w-4 h-4 mr-2" /> Carrinho
              </Link>

              {user ? (
                <Button onClick={handleSignOut} variant="ghost" className="w-full text-left p-3 hover:text-red-500">
                  <LogOut className="inline-block w-4 h-4 mr-2" /> Sair
                </Button>
              ) : (
                <>
                  <Link href="/registro" onClick={() => setIsOpen(false)} className="block p-3 hover:text-cyan-400">
                    <UserPlus className="inline-block w-4 h-4 mr-2" /> Registro
                  </Link>
                  <Link href="/entrar" onClick={() => setIsOpen(false)} className="block p-3 hover:text-cyan-400">
                    <User className="inline-block w-4 h-4 mr-2" /> Entrar
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
