import Image from "next/image"

export default function Mission() {
  return (
    <section className="relative py-20 bg-white"> {/* Agora com fundo branco direto */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossa Missão</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Promover a saúde, autonomia e qualidade de vida de pessoas com mais de 50 anos, por meio da produção e
                divulgação de conteúdos científicos, acessíveis e atualizados em fisioterapia em geral e geriátrica. A
                Viver Saudável tem como objetivo primário capacitar cuidadores, profissionais da saúde e o próprio idoso
                com conhecimento prático baseado em evidências.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Georgia Espinola Moura</h3>
              <p className="text-sm text-gray-500 mb-4">Fisioterapeuta • Fundadora</p>
              <p className="text-gray-600 leading-relaxed">
                Com mais de 14 anos de experiência na área da saúde, especialista em Fisioterapia Cardiorrespiratória
                pelo Instituto do Coração-INCOR/HCFMUSP com experiência em reabilitação funcional e promoção do
                bem-estar. Desde 2011, Georgia atua em João Pessoa – PB, em âmbito hospitalar e também com foco em
                fisioterapia domiciliar e reabilitação integrativa, especialmente voltada à população adulta e idosa.
              </p>
            </div>
          </div>

          {/* Founder Image */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/geo2.png"
                alt="Georgia Espinola Moura - Fundadora"
                width={400}
                height={500}
                className="rounded-lg shadow-lg Image-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
