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
    <div className="max-w-5xl mx-auto px-4 py-12">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actividades.map((actividad) => (
          <div key={actividad._meta.path} className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            {actividad.imagen ? (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={actividad.imagen}
                  alt={actividad.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <BookOpen size={36} className="text-blue-300" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-gray-900 mb-1">{actividad.titulo}</h2>
              {actividad.fecha && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar size={12} />
                  <time>
                    {new Date(actividad.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
              {actividad.descripcion && (
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{actividad.descripcion}</p>
              )}
              {actividad.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {actividad.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}
              {actividad.content && (
                <div
                  className="prose prose-sm max-w-none text-gray-700 border-t border-gray-100 pt-3 mt-auto"
                  dangerouslySetInnerHTML={{ __html: marked(actividad.content) }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
        <strong>¿Cómo editar esta sección?</strong> Agrega o modifica archivos en <code className="bg-blue-100 px-1 rounded">content/actividades/</code>. Para agregar una imagen, sube el archivo a <code className="bg-blue-100 px-1 rounded">public/actividades/</code> y usa <code className="bg-blue-100 px-1 rounded">imagen: "/actividades/tu-imagen.jpg"</code>.
      </div>
    </div>
  )
}
