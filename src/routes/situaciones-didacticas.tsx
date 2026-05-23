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
    <div className="max-w-4xl mx-auto px-4 py-12">
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

      <div className="space-y-6">
        {situaciones.map((sit) => (
          <div key={sit._meta.path} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <h2 className="text-xl font-semibold text-gray-900">{sit.titulo}</h2>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar size={14} />
                <time>
                  {new Date(sit.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{sit.descripcion}</p>

            {sit.objetivo && (
              <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <Target size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Objetivo</span>
                  <p className="text-sm text-amber-800 mt-0.5">{sit.objetivo}</p>
                </div>
              </div>
            )}

            {sit.content && (
              <div
                className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 pt-4 mt-2"
                dangerouslySetInnerHTML={{ __html: marked(sit.content) }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
        <strong>¿Cómo editar esta sección?</strong> Agrega o modifica archivos en <code className="bg-amber-100 px-1 rounded">content/situaciones-didacticas/</code>. Incluye el objetivo de la situación en el campo <code className="bg-amber-100 px-1 rounded">objetivo</code>.
      </div>
    </div>
  )
}
