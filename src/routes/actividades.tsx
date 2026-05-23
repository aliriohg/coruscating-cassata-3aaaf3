import { createFileRoute } from '@tanstack/react-router'
import { allActividades } from 'content-collections'
import { marked } from 'marked'
import { BookOpen, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/actividades')({
  component: Actividades,
})

function Actividades() {
  const actividades = [...allActividades].sort((a, b) => a.orden - b.orden)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
            <BookOpen size={20} className="text-blue-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Actividades</h1>
        </div>
        <p className="text-gray-600">
          Registro de las actividades académicas realizadas durante el semestre.
        </p>
      </div>

      <div className="space-y-6">
        {actividades.map((actividad, i) => (
          <div key={actividad._meta.path} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <h2 className="text-xl font-semibold text-gray-900">{actividad.titulo}</h2>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar size={14} />
                <time>
                  {new Date(actividad.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{actividad.descripcion}</p>
            {actividad.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {actividad.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}
            {actividad.content && (
              <div
                className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 pt-4 mt-2"
                dangerouslySetInnerHTML={{ __html: marked(actividad.content) }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
        <strong>¿Cómo editar esta sección?</strong> Agrega o modifica archivos en <code className="bg-blue-100 px-1 rounded">content/actividades/</code>. Cada archivo <code className="bg-blue-100 px-1 rounded">.md</code> representa una actividad.
      </div>
    </div>
  )
}
