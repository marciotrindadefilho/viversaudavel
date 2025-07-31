import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import AudiobookCard from '@/components/AudiobookCard';

// Garante que a página seja sempre dinâmica
export const revalidate = 0;

export default async function AudiobooksLibraryPage() {
    // CORREÇÃO: Usando o cliente de servidor para buscar os dados
    const supabase = createServerComponentClient<Database>({ cookies });
    
    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('tipo', 'audiobook');

    if (error) {
        console.error("Erro ao buscar audiobooks:", error.message);
        return <p className="text-center text-red-500 py-20">Ocorreu um erro ao buscar os audiobooks.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12">Nossa Biblioteca de Audiobooks</h1>
            
            {produtos && produtos.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {produtos.map((item) => (
                        <AudiobookCard key={item.id} audiobook={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-20">Nenhum audiobook encontrado no momento.</p>
            )}
        </div>
    );
}
