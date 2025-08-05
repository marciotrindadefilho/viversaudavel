"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Ebooks() {
 const ebooks = [
  {
    title: "Alimentação Saudável +50",
    image: "/nutri.jpeg",
    description: "Guia completo para uma alimentação equilibrada na maturidade",
    demo: "/audios/alimentacao.pdf",
  },
  {
    title: "Saúde Mental na Maturidade",
    image: "/nutri1.jpeg",
    description: "Estratégias para manter o bem-estar mental após os 50 anos",
    demo: "/audios/mental.pdf",
  },
  {
    title: "Exercícios para Seniors",
    image: "/nutri2.jpeg",
    description: "Programa de exercícios adaptados para a terceira idade",
    demo: "/audios/seniors.pdf",
  },
]


  return (
    <section className="relative py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/dna.jpg" alt="DNA Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Nossos E-books</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conteúdo especializado desenvolvido por profissionais da saúde para promover seu bem-estar e qualidade de
            vida, baseado em evidências científicas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ebooks.map((ebook, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative h-64">
                <Image src={ebook.image || "/placeholder.svg"} alt={ebook.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{ebook.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{ebook.description}</p>
                </div>
                <div className="flex flex-col gap-2 mt-4">
               <Link href={ebook.demo} target="_blank" rel="noopener noreferrer">
                      <Button
                    variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Ver Amostra
            </Button>
             </Link>
            
                     </div>
                  </div>
               </div>
              ))}
         </div>

        <div className="text-center">
          <Link href="/e-books/biblioteca">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Ver Todos os Ebooks
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
