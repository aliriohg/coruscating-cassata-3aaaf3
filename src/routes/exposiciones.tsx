import { createFileRoute } from '@tanstack/react-router'
import { allExposiciones } from 'content-collections'
import { marked } from 'marked'
import { Presentation, Calendar, User } from 'lucide-react'

export const Route = createFileRoute('/exposiciones')({
  component: Exposiciones,
})

function Exposiciones() {
  const exposiciones = [...allExposiciones].sort((a, b) => a.orden - b.orden)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
            <Presentation size={20} className="text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Exposiciones</h1>
        </div>
        <p className="text-gray-600">
          Presentaciones y ponencias realizadas en el marco de la asignatura.
        </p>
      </div>

      <div className="space-y-6">
        {exposiciones.map((expo) => (
          <div key={expo._meta.path} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <h2 className="text-xl font-semibold text-gray-900">{expo.titulo}</h2>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar size={14} />
                <time>
                  {new Date(expo.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>

            {expo.integrante && (
              <div className="flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit mb-4">
                <User size={14} />
                <span>{expo.integrante}</span>
              </div>
            )}

            <p className="text-gray-600 mb-4">{expo.descripcion}</p>

            {expo.content && (
              <div
                className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 pt-4 mt-2"
                dangerouslySetInnerHTML={{ __html: marked(expo.content) }}
              />
            )}

            {expo.archivo && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={expo.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900 font-medium"
                >
                  Ver presentación →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm text-emerald-800">
        <strong>¿Cómo editar esta sección?</strong> Agrega o modifica archivos en <code className="bg-emerald-100 px-1 rounded">content/exposiciones/</code>. Puedes agregar el enlace a la presentación en el campo <code className="bg-emerald-100 px-1 rounded">archivo</code>.
      </div>
    </div>
  )
}
