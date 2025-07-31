import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import EbookCard from '@/components/EbookCard';

// Garante que a página seja sempre dinâmica
export const revalidate = 0;

export default async function EbooksLibraryPage() {
    // CORREÇÃO: Usando o cliente de servidor para buscar os dados
    const supabase = createServerComponentClient<Database>({ cookies });
    
    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('tipo', 'ebook');

    if (error) {
        console.error("Erro ao buscar e-books:", error.message);
        return <p className="text-center text-red-500 py-20">Ocorreu um erro ao buscar os e-books.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12">Nossa Biblioteca de E-books</h1>
            
            {produtos && produtos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {produtos.map((produto) => (
                        <EbookCard key={produto.id} product={produto} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-20">Nenhum e-book encontrado no momento.</p>
            )}
        </div>
    );
}
