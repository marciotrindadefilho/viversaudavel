'use client'

import { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/types/supabase'
import Image from 'next/image'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Star, Headphones } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

type Produto = Database['public']['Tables']['produtos']['Row']

export default function AudiobooksLibraryPage() {
  const supabase = useSupabaseClient<Database>()
  const session = useSession()
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('tipo', 'audiobook')

      if (error) {
        console.error('Erro ao buscar produtos:', error)
      } else {
        setProdutos(data || [])
      }
    }

    fetchProdutos()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Audiobooks</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((item) => (
              <Card key={item.id}>
                <div className="relative h-56">
                  <Image
                    src={item.imagem || '/placeholder.svg'}
                    alt={item.titulo}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-yellow-400 text-black shadow-md">
                    Premium
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.titulo}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> 3h
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" /> 4.9
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="w-4 h-4" /> 500
                    </div>
                  </div>
                  {item.audio && (
                    <AudioPlayer
                      src={item.audio}
                      layout="horizontal"
                      className="rounded-xl mt-4"
                      autoPlay={false}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
