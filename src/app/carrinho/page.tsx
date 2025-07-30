'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type CarrinhoItem = {
  id: string 
  produto_id: string 
  user_id: string
  produtos: { 
    id: string 
    nome: string 
    preco: number
    imagem_url: string 
  }
}

export default function CarrinhoPage() {
  const [itens, setItens] = useState<CarrinhoItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCarrinho = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push('/entrar')
        return
      }

      
      const { data, error } = await supabase
        .from('carrinho_itens') 
        .select('id, produto_id, user_id, produtos ( id, nome, preco, imagem_url )') 
        .eq('user_id', session.user.id)

      if (error) {
        console.error('Erro ao carregar carrinho:', error)
      } else {
      
        setItens(data ?? [])
      }

      setLoading(false)
    }

    fetchCarrinho()
  }, [router])

  const removerItem = async (id: string) => {

    const { error } = await supabase.from('carrinho_itens').delete().eq('id', id)
    if (error) {
      console.error('Erro ao remover item:', error)
    } else {
      setItens((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const total = itens.reduce((acc, item) => acc + item.produtos.preco, 0)

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="text-gray-400">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {itens.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-white/10 rounded-lg backdrop-blur-md bg-white/5"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={item.produtos.imagem_url}
                  alt={item.produtos.nome}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.produtos.nome}</h2>
                  <p className="text-sm text-gray-400">R$ {item.produtos.preco.toFixed(2)}</p>
                </div>
              </div>
              <Button variant="destructive" onClick={() => removerItem(item.id)}>
                Remover
              </Button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">Total: R$ {total.toFixed(2)}</p>
            <Button className="mt-2" onClick={() => router.push('/checkout')}>
              Finalizar Compra
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}