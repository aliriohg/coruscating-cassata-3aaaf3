import { createFileRoute } from '@tanstack/react-router'
import { allIntegrantes } from 'content-collections'
import { marked } from 'marked'
import { Users } from 'lucide-react'

export const Route = createFileRoute('/quienes-somos')({
  component: QuienesSomos,
})

function QuienesSomos() {
  const integrantes = [...allIntegrantes].sort((a, b) => a.orden - b.orden)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-100">
            <Users size={20} className="text-violet-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Quiénes Somos</h1>
        </div>
        <p className="text-gray-600 ml-13">
          Conoce a las integrantes del grupo, sus intereses y su visión de la educación.
        </p>
      </div>

      <div className="space-y-8">
        {integrantes.map((integrante) => (
          <div
            key={integrante._meta.path}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Foto o avatar con inicial */}
              <div className="sm:w-40 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                {integrante.foto ? (
                  <img
                    src={integrante.foto}
                    alt={integrante.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold text-4xl">
                    {integrante.nombre.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-6 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900">{integrante.nombre}</h2>
                  {integrante.rol && (
                    <span className="bg-violet-100 text-violet-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {integrante.rol}
                    </span>
                  )}
                </div>
                {integrante.descripcion && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{integrante.descripcion}</p>
                )}
                {integrante.content && (
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: marked(integrante.content) }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-violet-50 border border-violet-200 rounded-xl p-5 text-sm text-violet-800">
        <strong>¿Cómo editar esta sección?</strong> Modifica los archivos dentro de <code className="bg-violet-100 px-1 rounded">content/integrantes/</code>. Para agregar una foto, sube la imagen a <code className="bg-violet-100 px-1 rounded">public/integrantes/</code> y usa la ruta <code className="bg-violet-100 px-1 rounded">foto: "/integrantes/tu-foto.jpg"</code> en el archivo .md.
      </div>
    </div>
  )
}
