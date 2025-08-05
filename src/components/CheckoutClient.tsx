'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2 } from 'lucide-react'

// O TIPO CORRIGIDO: Garantimos que todos os 'id's são do tipo 'string',
// resolvendo o conflito de tipos.
type CarrinhoItemComProduto = {
    id: string;
    quantidade: number;
    produtos: {
        id: string;
        titulo: string | null;
        preco: number | null;
        imagem: string | null;
    } | null;
};


export default function CheckoutClient({ initialItems, userId }: { initialItems: CarrinhoItemComProduto[], userId: string }) {
    const [itens, setItens] = useState(initialItems)
    const [isFinalizing, setIsFinalizing] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const router = useRouter()

    const total = itens.reduce((soma, item) => soma + ((item.produtos?.preco || 0) * item.quantidade), 0);

    const finalizarPedido = async () => {
        setIsFinalizing(true);

        const { error } = await supabase
            .from('carrinho')
            .delete()
            .eq('user_id', userId);

        if (error) {
            console.error('Erro ao finalizar pedido:', error);
            alert('Ocorreu um erro ao finalizar o seu pedido.');
            setIsFinalizing(false);
            return;
        }

        setIsFinished(true);

        setTimeout(() => {
            router.push('/');
        }, 3000);
    }

    if (isFinished) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-semibold">Pedido finalizado com sucesso!</h2>
                <p className="text-gray-500 mt-2">Obrigado pela sua compra. Você será redirecionado em instantes.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Revisar Pedido</h1>

            {itens.length === 0 ? (
                 <p className="text-gray-500 text-center py-10">Não há itens no seu carrinho para finalizar.</p>
            ) : (
                <>
                    <ul className="space-y-4 mb-8">
                        {itens.map((item) => (
                            item.produtos && (
                                <li key={item.id} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={item.produtos.imagem || '/placeholder.jpg'}
                                            alt={item.produtos.titulo || 'Produto sem nome'}
                                            width={64}
                                            height={64}
                                            className="rounded-lg object-cover border"
                                        />
                                        <div>
                                            <span className="font-medium text-gray-800">{item.produtos.titulo}</span>
                                            <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-gray-800">
                                        R$ {((item.produtos.preco || 0) * item.quantidade).toFixed(2).replace('.', ',')}
                                    </span>
                                </li>
                            )
                        ))}
                    </ul>

                    <hr className="my-6" />

                    <div className="space-y-2">
                         <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Frete</span>
                            <span className="font-semibold text-green-600">Grátis</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-gray-800 pt-4">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button 
                            onClick={finalizarPedido} 
                            disabled={isFinalizing}
                            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                        >
                            {isFinalizing ? (
                                <Loader2 className="animate-spin w-6 h-6" />
                            ) : (
                                'Finalizar e Pagar'
                            )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
