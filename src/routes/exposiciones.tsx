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
    <div className="max-w-5xl mx-auto px-4 py-12">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exposiciones.map((expo) => (
          <div key={expo._meta.path} className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            {expo.imagen ? (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={expo.imagen}
                  alt={expo.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                <Presentation size={36} className="text-emerald-300" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-gray-900 mb-1">{expo.titulo}</h2>
              {expo.fecha && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar size={12} />
                  <time>
                    {new Date(expo.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
              {expo.integrante && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg w-fit mb-2">
                  <User size={12} />
                  <span>{expo.integrante}</span>
                </div>
              )}
              {expo.descripcion && (
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{expo.descripcion}</p>
              )}
              {expo.content && (
                <div
                  className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 pt-3 mb-3"
                  dangerouslySetInnerHTML={{ __html: marked(expo.content) }}
                />
              )}
              {expo.archivo && (
                <div className="mt-auto pt-3 border-t border-gray-100">
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
          </div>
        ))}
      </div>

      <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm text-emerald-800">
        <strong>¿Cómo editar esta sección?</strong> Agrega o modifica archivos en <code className="bg-emerald-100 px-1 rounded">content/exposiciones/</code>. Para agregar una imagen, sube el archivo a <code className="bg-emerald-100 px-1 rounded">public/exposiciones/</code> y usa <code className="bg-emerald-100 px-1 rounded">imagen: "/exposiciones/tu-imagen.jpg"</code>. Puedes agregar el enlace a la presentación en el campo <code className="bg-emerald-100 px-1 rounded">archivo</code>.
      </div>
    </div>
  )
}
