"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Values() {
  const values = [
    {
      number: "1",
      title: "Educação Acessível",
      description: "Linguagem simples, prática e objetiva, que alcança profissionais e leigos.",
    },
    {
      number: "2",
      title: "Ética e Responsabilidade",
      description: "Atuação transparente, com respeito às individualidades e à diversidade de contextos.",
    },
    {
      number: "3",
      title: "Cuidado Humanizado",
      description: "Foco no ser humano, em todas as fases da vida.",
    },
    {
      number: "4",
      title: "Inovação Digital",
      description: "Uso da tecnologia como ferramenta para democratizar o acesso ao conhecimento em saúde.",
    },
  ]

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Nossos Valores</h2>
          <h3 className="text-2xl font-semibold text-green-600 mb-8">Nossa Expertise</h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Com formação em Fisioterapia, especialista Fisioterapia Cardiorrespiratória pelo Instituto do Coração-
            INCOR/HCFMUSP, anos de experiência na área hospitalar, reabilitação motora, neurológica, pós-operatório em
            geral, cardiopulmonar, como também em geriatria, oferecemos conteúdo confiável e prático baseado em ciência
            para uma vida mais saudável e ativa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-[#cce4f6] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-black"
            >
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {value.number}
              </div>
              <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
              <p className="leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
