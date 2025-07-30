'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader, CheckCircle2 } from 'lucide-react'

type Produto = {
  id: number
  titulo: string
  preco: number
  imagem: string
}

type CarrinhoItem = {
  id: number
  produto_id: number
  user_id: string
  produto: Produto
}

export default function CheckoutPage() {
  const [itens, setItens] = useState<CarrinhoItem[]>([])
  const [total, setTotal] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [finalizado, setFinalizado] = useState(false)
  const [carregando, setCarregando] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const buscarDados = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push('/entrar')
        return
      }

      const userId = session.user.id
      setUserId(userId)

      const { data, error } = await supabase
        .from('carrinho')
        .select('id, produto_id, user_id, produto (id, titulo, preco, imagem)')
        .eq('user_id', userId)

      if (error) {
        console.error('Erro ao buscar carrinho:', error)
      } else if (data) {
        const produtos = data as CarrinhoItem[]
        setItens(produtos)

        const totalCalculado = produtos.reduce(
          (soma, item) => soma + (item.produto?.preco || 0),
          0
        )
        setTotal(totalCalculado)
      }

      setCarregando(false)
    }

    buscarDados()
  }, [router])

  const finalizarPedido = async () => {
    if (!userId) return

    const { error } = await supabase
      .from('carrinho')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('Erro ao finalizar pedido:', error)
      return
    }

    setFinalizado(true)

    setTimeout(() => {
      router.push('/')
    }, 5000)
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-cyan-500">
        <Loader className="animate-spin w-8 h-8" />
        <span className="ml-2 text-lg">Carregando seu carrinho...</span>
      </div>
    )
  }

  if (finalizado) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-xl font-semibold text-white">Pedido finalizado com sucesso!</h2>
        <p className="text-gray-400 mt-2">Você será redirecionado para a home em instantes.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Revisar Pedido</h1>

      {itens.length === 0 ? (
        <p className="text-gray-400">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {itens.map((item) => (
              <li key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl shadow-sm">
                <Image
                  src={item.produto?.imagem || '/placeholder.jpg'}
                  alt={item.produto?.titulo}
                  width={80}
                  height={80}
                  className="rounded-xl object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-white font-medium">{item.produto?.titulo}</span>
                  <span className="text-cyan-400 font-bold">R$ {item.produto?.preco.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center text-white">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-cyan-400">R$ {total.toFixed(2)}</span>
          </div>

          <div className="mt-8">
            <Button onClick={finalizarPedido} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-6">
              Finalizar Pedido
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
