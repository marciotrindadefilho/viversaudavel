type AudioPlayerProps = {
  src: string
  title?: string
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className="my-4">
      {title && <h4 className="text-lg font-semibold">{title}</h4>}
      <audio controls className="w-full">
        <source src={src} type="audio/mpeg" />
        Seu navegador não suporta o áudio.
      </audio>
    </div>
  )
}

