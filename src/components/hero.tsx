import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Camada 0: Fundo gradiente base */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
      
      {/* Camada 5: Imagem de fundo */}
      <div className="absolute inset-0 z-5 opacity-30 mix-blend-lighten">
        <Image
          src="/viversaudavel.png" // Verifique se esta imagem está na pasta /public
          alt="Background Viver Saudável"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/30" />
      </div>

      {/* Camada 10: Efeitos visuais (partículas, linhas) */}
      <div className="absolute inset-0 z-10">
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
        </div>
        <div className="energy-lines">
          <div className="energy-line energy-line-1"></div>
          <div className="energy-line energy-line-2"></div>
        </div>
      </div>

      {/* Camada 20: Conteúdo de Texto e Botão */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-lg animate-fade-in-down">
          A sinergia entre <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Respiração e Nutrição
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          E-books e audiobooks de ponta em Fisioterapia Cardiorrespiratória e Nutrição Funcional para aprofundar sua prática clínica.
        </p>
        <Link href="/e-books/biblioteca"
          className="futuristic-menu-item inline-block text-lg font-semibold px-8 py-4 animate-fade-in-up"
          style={{ animationDelay: '1s' }}
        >
          Explore a Biblioteca
        </Link>
      </div>
    </section>
  )
}
