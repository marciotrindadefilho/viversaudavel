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

// Tipos para os itens do menu
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
            icon: "/ebook.png", // Adicionando ícone
            submenu: [{ title: "Biblioteca", href: "/e-books/biblioteca" }],
        },
        {
            title: "Audiobooks",
            icon: "/audiobook.png", // Adicionando ícone
            submenu: [{ title: "Biblioteca", href: "/audiobooks/biblioteca" }]
        },
    ]

    return (
        <header className="futuristic-header relative z-50">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-sm"></div>
            <div className="container mx-auto px-4 py-2 relative z-10">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center group">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <Image
                                src="/logo.png" // Verifique se o logo está na pasta /public
                                alt="Viver Saudável"
                                width={180}
                                height={40}
                                className="relative"
                            />
                        </div>
                    </Link>

                    {/* Navegação Principal para Desktop */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <nav className="flex items-center space-x-6">
                            {menuItems.map((item) => (
                                <div key={item.title} className="relative group">
                                    <button className="futuristic-menu-item flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300">
                                        <span className="font-medium">{item.title}</span>
                                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-56 futuristic-dropdown opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {item.submenu.map((subitem) => (
                                            <Link key={subitem.title} href={subitem.href} className="block px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-200 border-l-2 border-transparent hover:border-cyan-400">
                                                {subitem.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <Link href="/#contato" className="futuristic-nav-link px-4 py-2">Contato</Link>
                        </nav>

                        {/* Lógica de Autenticação */}
                        <div className="flex items-center space-x-4">
                            <Link href="/carrinho" aria-label="Carrinho" className="futuristic-nav-link p-2">
                                <ShoppingCart className="w-6 h-6" />
                            </Link>
                            {user ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-300">Olá, {user.email?.split("@")[0]}</span>
                                    <Button onClick={handleSignOut} variant="outline" size="sm" className="futuristic-button-danger">
                                        <LogOut className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button asChild variant="ghost" className="futuristic-nav-link">
                                        <Link href="/entrar">Entrar</Link>
                                    </Button>
                                    <Button asChild className="bg-green-600 hover:bg-green-700">
                                        <Link href="/registro">Registrar</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menu Móvel */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" className="futuristic-mobile-button">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80 futuristic-mobile-menu">
                            {/* Conteúdo do menu lateral */}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
