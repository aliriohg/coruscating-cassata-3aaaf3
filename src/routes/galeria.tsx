import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Image, Video, ChevronLeft, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/galeria')({
  component: Galeria,
})

const fotoUrls = Object.values(
  import.meta.glob('../galeria/fotos/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>
)

const videoUrls = Object.values(
  import.meta.glob('../galeria/videos/*.{mp4,webm,MP4,WEBM}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>
)

function Carrusel({ fotos }: { fotos: string[] }) {
  const [current, setCurrent] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const prev = () => setCurrent((c) => (c - 1 + fotos.length) % fotos.length)
  const next = () => setCurrent((c) => (c + 1) % fotos.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    setTouchStart(null)
  }

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={fotos[current]}
          alt={`Foto ${current + 1}`}
          className="w-full h-full object-contain"
        />
        {fotos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
            <span className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2.5 py-1 rounded-full">
              {current + 1} / {fotos.length}
            </span>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {fotos.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === current
                  ? 'border-rose-500 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={src} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Galeria() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-100">
            <Image size={20} className="text-rose-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Fotos y Videos</h1>
        </div>
        <p className="text-gray-600">
          Galería multimedia con momentos significativos de nuestro proceso formativo.
        </p>
      </div>

      {fotoUrls.length > 0 ? (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Image size={18} className="text-rose-600" />
            <h2 className="text-xl font-semibold text-gray-800">Fotografías</h2>
          </div>
          <Carrusel fotos={fotoUrls} />
        </section>
      ) : null}

      {videoUrls.length > 0 ? (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Video size={18} className="text-rose-600" />
            <h2 className="text-xl font-semibold text-gray-800">Videos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoUrls.map((url, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <video src={url} controls className="w-full aspect-video" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {fotoUrls.length === 0 && videoUrls.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Image size={48} className="mx-auto mb-3 opacity-30" />
          <p>Aún no hay fotos ni videos.</p>
        </div>
      )}

      <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-sm text-rose-800">
        <strong>¿Cómo agregar fotos o videos?</strong> Sube las fotos (jpg, png, webp) a{' '}
        <code className="bg-rose-100 px-1 rounded">src/galeria/fotos/</code> y los videos (mp4) a{' '}
        <code className="bg-rose-100 px-1 rounded">src/galeria/videos/</code>. Se mostrarán automáticamente sin editar ningún archivo.
      </div>
    </div>
  )
}
