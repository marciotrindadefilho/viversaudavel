'use client'

import { useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import type { Database } from '@/types/supabase'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'

type Produto = Database['public']['Tables']['produtos']['Row']
type Carrinho = Database['public']['Tables']['carrinho']['Insert']

export default function EbookCard({ product }: { product: Produto }) {
    const supabase = useSupabaseClient<Database>()
    const session = useSession()
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = async () => {
        if (!session?.user) {
            alert('Você precisa estar logado para adicionar itens ao carrinho.');
            return;
        }

        setIsAdding(true);

        const { error } = await supabase.from('carrinho').insert({
            user_id: session.user.id,
            produto_id: product.id,
            quantidade: 1
        } as Carrinho);

        if (error) {
            console.error('Erro ao adicionar ao carrinho:', error.message);
            alert('Ocorreu um erro ao adicionar o produto ao carrinho.');
        } else {
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }

        setIsAdding(false);
    }

    return (
        <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-64 w-full">
                <Image
                    src={product.imagem || '/placeholder.svg'}
                    alt={product.titulo || 'Capa do E-book'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-blue-500 text-white shadow-md border-none">
                    E-book
                </Badge>
            </div>
            <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 flex-grow">{product.titulo}</h3>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-gray-800">
                        R$ {(product.preco ?? 0).toFixed(2).replace('.', ',')}
                    </span>
                    <Button 
                        onClick={handleAddToCart} 
                        disabled={isAdding || isAdded}
                        className={`transition-all duration-300 w-40 ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isAdding ? <Loader2 className="animate-spin w-5 h-5" /> : isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5 mr-2" />}
                        {isAdding ? '' : isAdded ? 'Adicionado' : 'Adicionar'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
