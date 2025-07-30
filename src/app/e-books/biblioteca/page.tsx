'use client'

import { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/types/supabase'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Produto = Database['public']['Tables']['produtos']['Row']
type Carrinho = Database['public']['Tables']['carrinho']['Insert']

export default function EbooksLibraryPage() {
  const supabase = useSupabaseClient<Database>()
  const session = useSession()
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('tipo', 'ebook')

      if (error) {
        console.error('Erro ao buscar e-books:', error)
      } else {
        setProdutos(data)
      }
    }

    fetchProdutos()
  }, [supabase])

  const adicionarAoCarrinho = async (produto_id: number) => {
    if (!session?.user) {
      alert('Você precisa estar logado para adicionar ao carrinho.')
      return
    }

    const { error } = await supabase.from('carrinho').insert({
      user_id: session.user.id,
      produto_id,
      quantidade: 1
    } as Carrinho)

    if (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    } else {
      alert('Produto adicionado ao carrinho!')
    }
  }

  return (
    <main className="container py-10 text-center">
      <h1 className="text-2xl font-bold mb-8">E-books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white rounded-lg shadow-md p-4">
            <Image
              src={produto.imagem || '/placeholder.svg'}
              alt={produto.titulo}
              width={300}
              height={200}
              className="object-cover rounded mb-4 w-full"
            />
            <h2 className="text-lg font-semibold mb-2">{produto.titulo}</h2>
            <p className="text-sm text-gray-600 mb-4">
              R$ {produto.preco?.toFixed(2)}
            </p>
            <Button onClick={() => adicionarAoCarrinho(produto.id)}>
              Adicionar ao Carrinho
            </Button>
          </div>
        ))}
      </div>
    </main>
  )
}
