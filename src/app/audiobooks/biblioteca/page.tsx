import { supabase } from '@/lib/supabaseClient';
import AudiobookCard from '@/components/AudiobookCard'; // Nosso novo componente interativo

// A página agora é um Server Component, buscando dados de forma assíncrona.
export default async function AudiobooksLibraryPage() {
    
    // Busca os dados da tabela 'produtos' no Supabase
    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('tipo', 'audiobook');

    if (error) {
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

// Garante que os dados sejam sempre recentes.
export const revalidate = 0;
