import { supabase } from '@/lib/supabaseClient';
import EbookCard from '@/components/EbookCard';

// A página é um Server Component, buscando dados de forma assíncrona.
export default async function EbooksLibraryPage() {
    
    // Busca os dados da tabela 'produtos' no Supabase
    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('tipo', 'ebook');

    // Se ocorrer um erro na busca, exibe uma mensagem clara.
    if (error) {
        console.error("Erro ao buscar e-books no Supabase:", error.message);
        return <p className="text-center text-red-500 py-20">Ocorreu um erro ao buscar os e-books. Tente novamente mais tarde.</p>;
    }

    // Se 'produtos' for nulo ou vazio, exibe uma mensagem amigável.
    if (!produtos || produtos.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold mb-12">Nossa Biblioteca de E-books</h1>
                <p className="text-gray-500 py-20">Nenhum e-book encontrado no momento. Volte em breve!</p>
            </div>
        );
    }

    // Se tudo der certo, exibe a lista de produtos.
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12">Nossa Biblioteca de E-books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {produtos.map((produto) => (
                    // Adicionamos uma verificação para garantir que o produto não é nulo antes de renderizar
                    produto && <EbookCard key={produto.id} product={produto} />
                ))}
            </div>
        </div>
    );
}

// Garante que os dados sejam sempre recentes.
export const revalidate = 0;
