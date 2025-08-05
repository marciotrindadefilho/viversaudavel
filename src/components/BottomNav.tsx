"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';
import { Home, BookOpen, Headphones, User, ShoppingCart } from 'lucide-react'; // Adicionado o ícone do Carrinho

// Componente para um único ícone da barra de navegação
const NavLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const pathname = usePathname();
    // A verificação 'href === "/"' é para o 'Início' não ficar ativo em todas as páginas
    const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

    return (
        <Link href={href} className="flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 group">
            <div className={`transition-colors duration-200 ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`}>
                {icon}
            </div>
            <span className={`text-xs mt-1 transition-colors duration-200 ${isActive ? 'text-cyan-400 font-semibold' : 'text-gray-400 group-hover:text-white'}`}>
                {label}
            </span>
        </Link>
    );
};


export default function BottomNav() {
    const session = useSession();

    return (
        // Este menu só aparece em telas pequenas (lg:hidden para corresponder ao novo header)
        // Estilo atualizado para o tema "Black"
        <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full bg-black bg-opacity-80 backdrop-blur-md border-t border-gray-800">
            <div className="flex justify-around items-center h-16">
                <NavLink 
                    href="/" 
                    label="Início"
                    icon={<Home className="w-6 h-6" />}
                />
                <NavLink 
                    href="/e-books/biblioteca" 
                    label="E-books"
                    icon={<BookOpen className="w-6 h-6" />}
                />
                <NavLink 
                    href="/audiobooks/biblioteca" 
                    label="Audiobooks"
                    icon={<Headphones className="w-6 h-6" />}
                />
                {/* Ícone do Carrinho adicionado */}
                <NavLink 
                    href="/carrinho" 
                    label="Carrinho"
                    icon={<ShoppingCart className="w-6 h-6" />}
                />
                <NavLink 
                    href={session ? "/perfil" : "/entrar"} 
                    label={session ? "Perfil" : "Entrar"}
                    icon={<User className="w-6 h-6" />}
                />
            </div>
        </nav>
    );
}
