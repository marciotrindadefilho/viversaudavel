"use client"; 

import Link from 'next/link';

export default function Header() {
    return (
        // A MÁGICA ESTÁ AQUI: 'hidden' esconde em telas pequenas. 'md:flex' exibe em telas médias ou maiores.
        <header className="hidden md:flex bg-white shadow-sm sticky top-0 z-20">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/">
                    <img 
                        src="https://i.imgur.com/569a9b6b-2826-4071-8b2b-09292886f7b9.png" // Usando a URL da nova logo
                        alt="Logo Viver Saudável" 
                        className="h-10 cursor-pointer" 
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/200x40/000000/FFFFFF?text=Viver+Saud%C3%A1vel';
                        }} 
                    />
                </Link>

                <nav className="flex items-center space-x-6">
                    <Link href="/e-books" className="text-gray-600 hover:text-green-700 transition">E-books</Link>
                    <Link href="/audiobooks" className="text-gray-600 hover:text-green-700 transition">Audiobooks</Link>
                    <Link href="/#contato" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition shadow">Contato</Link>
                </nav>
            </div>
        </header>
    );
}
