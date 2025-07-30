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


type SubMenuItem = {
  title: string
  href: string
}

type MenuItem = {
  title: string
  icon?: string
  submenu: SubMenuItem[]
}

export default function header() {
  const [isOpen, setIsOpen] = useState(false)
  const supabase = useSupabaseClient<Database>()
  const session = useSession()
  const user = session?.user ?? null
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
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
      submenu: [{title: "Biblioteca", href: "/audiobooks/biblioteca"}]
    },
    ]

  return (
    <header className="futuristic-header relative z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 py-2 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative z-10 logo-container">
                <Image
                  src="/logo.png"
                  alt="Viver Saudável"
                  width={180}
                  height={50}
                  className="h-10 px-4 py-2 logo-transparent"
                />
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.title} className="relative group">
                  <button className="futuristic-menu-item flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300">
                    {item.icon && (
                      <Image src={item.icon || "/placeholder.svg"} alt={item.title} width={20} height={20} />
                    )}
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                  </button>

                  <div className="absolute top-full left-0 mt-2 w-56 futuristic-dropdown opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-3">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className="block px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-200 border-l-2 border-transparent hover:border-cyan-400"
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
              <Link href="#contato" className="futuristic-nav-link">
                Contato
              </Link>
              <Link href="/carrinho" className="futuristic-nav-link">
                <ShoppingCart className="w-5 h-5" />
              </Link>

              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    Olá, {user.email?.split("@")[0]}
                  </span>
                  <Button onClick={handleSignOut} variant="ghost" size="icon" className="futuristic-button-danger">
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/registro" className="futuristic-nav-link" title="Registro">
                    <UserPlus className="w-5 h-5" />
                  </Link>
                  <Link href="/entrar" className="futuristic-nav-link" title="Entrar">
                    <User className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </nav>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="futuristic-mobile-button">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 futuristic-mobile-menu">
              <div className="flex flex-col space-y-4 mt-8">
                {menuItems.map((item) => (
                  <Collapsible key={item.title}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-lg transition-all duration-200">
                      <span className="font-medium">{item.title}</span>
                      <ChevronDown className="w-4 h-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-2 mt-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          onClick={() => setIsOpen(false)}
                          className="block p-2 text-sm text-gray-600 hover:text-cyan-600 hover:bg-cyan-50/50 rounded transition-all duration-200"
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                <hr className="border-white/20" />

                <Link
                  href="/#contato"
                  className="p-3 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contato
                </Link>
                <Link
                  href="/carrinho"
                  className="p-3 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-lg flex items-center transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrinho
                </Link>

                {user ? (
                  <Button
                    onClick={handleSignOut}
                    className="w-full justify-start p-3 hover:bg-red-500/10 flex items-center transition-all duration-200"
                    variant="ghost"
                  >
                    <LogOut className="w-4 h-4 mr-2 text-red-500" /> Sair
                  </Button>
                ) : (
                  <>
                    <Link
                      href="/registro"
                      className="p-3 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-lg flex items-center transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Registro
                    </Link>
                    <Link
                      href="/entrar"
                      className="p-3 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-lg flex items-center transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Entrar
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
