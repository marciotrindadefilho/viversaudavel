"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Blog() {
  const blogPosts = [
    {
      title: "5 Exercícios Essenciais para Manter a Mobilidade após os 50",
      excerpt:
        "Descubra exercícios simples que podem ser feitos em casa para manter suas articulações saudáveis e flexíveis.",
      image: "/nutri2.jpeg",
      date: "15 Jan 2025",
      category: "Exercícios",
    },
    {
      title: "Alimentação Anti-inflamatória: O que Incluir no seu Prato",
      excerpt: "Conheça os alimentos que ajudam a reduzir a inflamação no corpo e promovem o envelhecimento saudável.",
      image: "/nutri.jpeg",
      date: "12 Jan 2025",
      category: "Nutrição",
    },
    {
      title: "Técnicas de Respiração para Reduzir o Estresse",
      excerpt:"Aprenda técnicas simples de respiração que podem ajudar a controlar a ansiedade e melhorar seu bem-estar.",
      image: "/nutri1.jpeg",
      date: "10 Jan 2025",
      category: "Saúde Mental",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Nosso Blog: Dicas para Viver Saudável</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encontre artigos e insights para uma vida mais ativa, plena e feliz após os 50 anos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">{post.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="flex justify-center">
                  <Link href={`/mais/blog ${post.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Leia Mais
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link href="/mais/blog">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Ver Todos os Artigos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
