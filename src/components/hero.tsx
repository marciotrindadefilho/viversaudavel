import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fundo: gradiente sutil com partículas e energia */}
      <div className="absolute inset-0 z-0 bg-radial-gradient-black">
        <div className="absolute inset-0 floating-particles">
          <div className="particle particle-gold-1"></div>
          <div className="particle particle-silver-2"></div>
          <div className="particle particle-gold-3"></div>
          <div className="particle particle-silver-4"></div>
          <div className="particle particle-gold-5"></div>
        </div>

        <div className="absolute inset-0 energy-lines">
          <div className="energy-line energy-line-gold"></div>
          <div className="energy-line energy-line-silver"></div>
        </div>
      </div>

      {/* Logo no centro */}
      <div className="relative z-10">
        <Image
          src="/viversaudavel.png"
          alt="Viver Saudável"
          width={500}
          height={200}
          className="w-auto h-auto max-w-[300px] md:max-w-[500px]"
          priority
        />
      </div>
    </section>
  )
}
