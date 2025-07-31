"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Componente para um único ícone da barra de navegação
const NavLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    // Hook para verificar a rota atual
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className="flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200">
            <div className={`transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'}`}>
                {icon}
            </div>
            <span className={`text-xs mt-1 transition-colors duration-200 ${isActive ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                {label}
            </span>
        </Link>
    );
};


export default function BottomNav() {
    return (
        // Este menu só aparece em telas pequenas (md:hidden)
        <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full bg-black bg-opacity-80 backdrop-blur-md border-t border-gray-800">
            <div className="flex justify-around items-center h-16">
                <NavLink 
                    href="/" 
                    label="Início"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
                />
                <NavLink 
                    href="/ebooks" 
                    label="E-books"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>}
                />
                <NavLink 
                    href="/audiobooks" 
                    label="Audiobooks"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>}
                />
                <NavLink 
                    href="/perfil" 
                    label="Perfil"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}
                />
            </div>
        </nav>
    );
}
