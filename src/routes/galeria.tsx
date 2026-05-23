import { createFileRoute } from '@tanstack/react-router'
import { allGalerias } from 'content-collections'
import { Image, Video } from 'lucide-react'

export const Route = createFileRoute('/galeria')({
  component: Galeria,
})

function Galeria() {
  const items = [...allGalerias].sort((a, b) => a.orden - b.orden)
  const fotos = items.filter((i) => i.tipo === 'foto')
  const videos = items.filter((i) => i.tipo === 'video')

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

      {/* Fotos */}
      {fotos.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Image size={18} className="text-rose-600" />
            <h2 className="text-xl font-semibold text-gray-800">Fotografías</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fotos.map((foto) => (
              <div key={foto._meta.path} className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={foto.url}
                    alt={foto.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm text-gray-900">{foto.titulo}</p>
                  {foto.descripcion && (
                    <p className="text-xs text-gray-500 mt-0.5">{foto.descripcion}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(foto.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Video size={18} className="text-rose-600" />
            <h2 className="text-xl font-semibold text-gray-800">Videos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video._meta.path} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={video.url}
                    title={video.titulo}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm text-gray-900">{video.titulo}</p>
                  {video.descripcion && (
                    <p className="text-xs text-gray-500 mt-0.5">{video.descripcion}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-sm text-rose-800">
        <strong>¿Cómo editar esta sección?</strong> Agrega archivos en <code className="bg-rose-100 px-1 rounded">content/galeria/</code>. Para fotos usa <code className="bg-rose-100 px-1 rounded">tipo: "foto"</code> con la URL de la imagen. Para videos de YouTube usa <code className="bg-rose-100 px-1 rounded">tipo: "video"</code> con el link embed (<code className="bg-rose-100 px-1 rounded">youtube.com/embed/ID</code>).
      </div>
    </div>
  )
}
