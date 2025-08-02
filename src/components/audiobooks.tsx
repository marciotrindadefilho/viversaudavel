"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AudiobookDemoPlayer from "./AudiobookDemoPlayer";

export default function Audiobooks() {
  const audiobooks = [
    {
      title: "Geriatria",
      image: "/fisio5.png",
      description: "Reabilitação em idosos, sarcopenia, equilíbrio, quedas",
      audio: "/audios/geriatria.mp3",
    },
    {
      title: "Neurologia",
      image: "/fisio3.png",
      description: "AVC, Parkinson, esclerose múltipla, lesões medulares, paralisia cerebral",
      audio: "/audios/neurologia.mp3",
    },
    {
      title: "Respiratória",
      image: "/fisio6.png",
      description: "DPOC, asma, fibrose cística, pós-operatório de cirurgias torácicas",
      audio: "/audios/respiratoria.mp3",
    },
  ];

  return (
    <section className="relative py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/dna.jpg" alt="DNA Background" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Nossos Audiobooks</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conteúdo especializado desenvolvido por profissionais da saúde para promover seu bem-estar e qualidade de
            vida, baseado em evidências científicas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {audiobooks.map((audiobook, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative h-64">
                <Image src={audiobook.image} alt={audiobook.title} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{audiobook.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{audiobook.description}</p>
                  <AudiobookDemoPlayer src={audiobook.audio} />
                </div>
                </div>
              </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/audiobooks/biblioteca">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Ver Todos os Audiobooks
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
