import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria Silva",
      age: "62 anos",
      text: "Os e-books da Viver Saudável mudaram minha perspectiva sobre envelhecimento. Agora me sinto mais confiante para cuidar da minha saúde.",
      image: "/dna.jpg",
    },
    {
      name: "João Santos",
      age: "58 anos",
      text: "Como cuidador da minha mãe, encontrei informações valiosas que me ajudaram muito no dia a dia. Conteúdo de qualidade e fácil de entender.",
      image: "/resp.png",
    },
    {
      name: "Ana Costa",
      age: "65 anos",
      text: "Excelente material! A linguagem é clara e as dicas são práticas. Recomendo para todos que querem envelhecer com saúde e dignidade.",
      image: "/nutri.jpeg",
    },
  ]

  return (
    <section className="relative py-20 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/dna.jpg" alt="DNA Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">O que Nossos Leitores Dizem</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Histórias reais de pessoas que transformaram suas vidas com nossos conteúdos
          </p>
        </div>

        {/* Grade de Depoimentos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            // AJUSTE: Adicionado flexbox para garantir que os cards tenham a mesma altura
            <div key={index} className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.age}</p>
                </div>
              </div>
              {/* AJUSTE: flex-grow faz o texto ocupar o espaço disponível, alinhando os rodapés dos cards */}
              <p className="text-gray-600 leading-relaxed italic flex-grow">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        {/* AJUSTE: O botão foi movido para FORA da grade de depoimentos.
          Ele agora fica centralizado abaixo da grade, com uma margem no topo (mt-16).
        */}
        <div className="text-center mt-16">
          <Link href="/mais/depoimentos">
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300">
              Ver Todos os Depoimentos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
