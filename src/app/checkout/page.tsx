import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Database } from '@/types/supabase';
import CheckoutClient from '@/components/CheckoutClient'; // O nosso componente de cliente interativo

// Garante que a página seja sempre dinâmica
export const revalidate = 0;

export default async function CheckoutPage() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/entrar');
    }

    // Busca os itens do carrinho e os dados dos produtos relacionados
    const { data: itensCarrinho, error } = await supabase
        .from('carrinho')
        .select(`
            id,
            quantidade,
            produtos (
                id,
                titulo,
                preco,
                imagem
            )
        `)
        .eq('user_id', session.user.id);

    if (error) {
        console.error("Erro ao buscar itens para o checkout:", error);
        return <p className="text-center text-red-500 py-20">Erro ao carregar seu checkout.</p>;
    }

    // A página apenas entrega os dados para o componente de cliente.
    // O '|| []' é a nossa segurança para garantir que nunca passamos 'undefined'.
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <CheckoutClient initialItems={itensCarrinho || []} userId={session.user.id} />
        </div>
    );
}
