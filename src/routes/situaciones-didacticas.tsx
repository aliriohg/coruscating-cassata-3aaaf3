import { createFileRoute } from '@tanstack/react-router'
import { allSituacionesDidacticas } from 'content-collections'
import { marked } from 'marked'
import { Lightbulb, Calendar, Target } from 'lucide-react'

export const Route = createFileRoute('/situaciones-didacticas')({
  component: SituacionesDidacticas,
})

function SituacionesDidacticas() {
  const situaciones = [...allSituacionesDidacticas].sort((a, b) => a.orden - b.orden)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100">
            <Lightbulb size={20} className="text-amber-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Situaciones Didácticas</h1>
        </div>
        <p className="text-gray-600">
          Diseño e implementación de situaciones didácticas en contextos reales de aula.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {situaciones.map((sit) => (
          <div key={sit._meta.path} className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            {sit.imagen ? (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={sit.imagen}
                  alt={sit.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                <Lightbulb size={36} className="text-amber-300" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-gray-900 mb-1">{sit.titulo}</h2>
              {sit.fecha && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar size={12} />
                  <time>
                    {new Date(sit.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
              {sit.descripcion && (
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{sit.descripcion}</p>
              )}
              {sit.objetivo && (
                <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                  <Target size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Objetivo</span>
                    <p className="text-xs text-amber-800 mt-0.5">{sit.objetivo}</p>
                  </div>
                </div>
              )}
              {sit.content && (
                <div
                  className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 pt-3 mt-auto"
                  dangerouslySetInnerHTML={{ __html: marked(sit.content) }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
        <strong>¿Cómo editar esta sección?</strong> Agrega o modifica archivos en <code className="bg-amber-100 px-1 rounded">content/situaciones-didacticas/</code>. Para agregar una imagen, sube el archivo a <code className="bg-amber-100 px-1 rounded">public/situaciones-didacticas/</code> y usa <code className="bg-amber-100 px-1 rounded">imagen: "/situaciones-didacticas/tu-imagen.jpg"</code>. Incluye el objetivo en el campo <code className="bg-amber-100 px-1 rounded">objetivo</code>.
      </div>
    </div>
  )
}
