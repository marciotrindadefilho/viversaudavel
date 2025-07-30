import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fundo gradiente que combina com a imagem img.carrinho */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/50 via-transparent to-slate-900/50"></div>

        {/* Padrão de pontos para simular o espaço */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/6 w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/6 w-1 h-1 bg-cyan-500 rounded-full animate-pulse"
            style={{ animationDelay: "2.5s" }}
          ></div>
        </div>
      </div>

      {/* Background Image */}
      {/* Mudei o z-index para 5 para ficar atrás dos efeitos, mas acima dos gradientes base */}
      <div className="absolute inset-0 z-5">
        <Image
          src="/viversaudavel.png"
          alt="Background"
          fill
          className="object-cover" 
          priority
          style={{
            objectPosition: "center",
          }}
        />
        {/* Overlay sutil para melhor integração sobre a imagem */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/30" />
      </div>

      {/* Efeitos visuais futuristas */}
      {/* Mantive o z-index dos efeitos em 20 para que fiquem acima da imagem */}
      <div className="absolute inset-0 z-20">
        {/* Partículas flutuantes */}
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        {/* Linhas de energia */}
        <div className="energy-lines">
          <div className="energy-line energy-line-1"></div>
          <div className="energy-line energy-line-2"></div>
          <div className="energy-line energy-line-3"></div>
        </div>
      </div>

      {/* Conteúdo mínimo - apenas efeitos visuais */}
      {/* Conteúdo principal deve ter o maior z-index para ser visível */}
      <div className="relative z-25 text-center max-w-4xl mx-auto px-4">
        {/* Elemento decorativo central */}
        <div className="hero-center-element">
          <div className="pulse-ring"></div>
          <div className="pulse-ring pulse-ring-delay-1"></div>
          <div className="pulse-ring pulse-ring-delay-2"></div>
        </div>
      </div>
    </section>
  )
}