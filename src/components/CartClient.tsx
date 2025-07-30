'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X, ShoppingCart, Loader2 } from 'lucide-react'

// O TIPO CORRIGIDO: Garantimos que todos os 'id's são do tipo 'string',
// que corresponde ao tipo 'uuid' do Supabase.
type CarrinhoItem = {
    id: string;
    quantidade: number;
    produtos: {
        id: string; // Corrigido para string
        titulo: string | null;
        preco: number | null;
        imagem: string | null;
    } | null;
}

// O componente agora recebe os itens iniciais com o tipo correto
export default function CartClient({ initialItems }: { initialItems: CarrinhoItem[] }) {
    const [itens, setItens] = useState(initialItems)
    const [isRemoving, setIsRemoving] = useState<string | null>(null);
    const router = useRouter()

    const removerItem = async (id: string) => {
        setIsRemoving(id);
        
        const { error } = await supabase.from('carrinho').delete().eq('id', id)
        if (error) {
            console.error('Erro ao remover item:', error)
            alert('Erro ao remover o item.');
        } else {
            setItens((prev) => prev.filter((item) => item.id !== id))
        }
        setIsRemoving(null);
    }

    const total = itens.reduce((acc, item) => {
        const preco = item.produtos?.preco ?? 0;
        return acc + (preco * item.quantidade);
    }, 0)

    if (itens.length === 0) {
        return (
            <div className="text-center py-20">
                <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
                <h2 className="mt-4 text-2xl font-bold">Seu carrinho está vazio</h2>
                <p className="mt-2 text-gray-500">Explore nossos produtos e encontre algo que você ame.</p>
                <Button className="mt-6" onClick={() => router.push('/e-books/biblioteca')}>
                    Explorar E-books
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
                {itens.map((item) => (
                    item.produtos && (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
                        >
                            <div className="flex items-center space-x-4">
                                <Image
                                    src={item.produtos.imagem || '/placeholder.svg'}
                                    alt={item.produtos.titulo || 'Produto sem título'}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">{item.produtos.titulo}</h2>
                                    <p className="text-sm text-gray-500">
                                        R$ {(item.produtos.preco ?? 0).toFixed(2).replace('.', ',')}
                                    </p>
                                </div>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removerItem(item.id)}
                                disabled={isRemoving === item.id}
                                className="text-gray-400 hover:text-red-500"
                            >
                                {isRemoving === item.id ? (
                                    <Loader2 className="animate-spin w-5 h-5" />
                                ) : (
                                    <X className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    )
                ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                    <h2 className="text-2xl font-bold mb-4">Resumo</h2>
                    <div className="flex justify-between mb-2 text-gray-600">
                        <span>Subtotal</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between mb-4 text-gray-600">
                        <span>Frete</span>
                        <span className="text-green-600 font-semibold">Grátis</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 h-12 text-lg" onClick={() => router.push('/checkout')}>
                        Finalizar Compra
                    </Button>
                </div>
            </div>
        </div>
    )
}
