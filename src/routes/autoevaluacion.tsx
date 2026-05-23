import { createFileRoute } from '@tanstack/react-router'
import { allAutoevaluacions } from 'content-collections'
import { marked } from 'marked'
import { ClipboardCheck } from 'lucide-react'

export const Route = createFileRoute('/autoevaluacion')({
  component: Autoevaluacion,
})

function Autoevaluacion() {
  const evaluaciones = [...allAutoevaluacions].sort((a, b) => a.orden - b.orden)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100">
            <ClipboardCheck size={20} className="text-indigo-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Autoevaluación</h1>
        </div>
        <p className="text-gray-600">
          Reflexiones individuales de cada integrante sobre su proceso de aprendizaje y crecimiento personal durante el semestre.
        </p>
      </div>

      <div className="space-y-8">
        {evaluaciones.map((eva) => (
          <div key={eva._meta.path} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">{eva.integrante}</h2>
                <span className="text-indigo-200 text-sm">{eva.periodo}</span>
              </div>
              <p className="text-indigo-100 text-sm mt-1">{eva.descripcion}</p>
            </div>
            {eva.content && (
              <div
                className="prose prose-sm max-w-none p-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: marked(eva.content) }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-sm text-indigo-800">
        <strong>¿Cómo editar esta sección?</strong> Cada integrante tiene su propio archivo en <code className="bg-indigo-100 px-1 rounded">content/autoevaluacion/</code>. Modifica el archivo correspondiente para actualizar tu reflexión.
      </div>
    </div>
  )
}
