import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Users, Presentation, Lightbulb, Image, ClipboardCheck, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Inicio,
})

const secciones = [
  {
    to: '/quienes-somos',
    icon: Users,
    titulo: 'Quiénes Somos',
    descripcion: 'Conoce a las integrantes del grupo, nuestros intereses y nuestra visión de la educación.',
    color: 'bg-violet-100 text-violet-700',
    border: 'border-violet-200 hover:border-violet-400',
  },
  {
    to: '/actividades',
    icon: BookOpen,
    titulo: 'Actividades',
    descripcion: 'Registro de las actividades académicas realizadas durante el semestre.',
    color: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200 hover:border-blue-400',
  },
  {
    to: '/exposiciones',
    icon: Presentation,
    titulo: 'Exposiciones',
    descripcion: 'Presentaciones y ponencias realizadas en el marco de la asignatura.',
    color: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200 hover:border-emerald-400',
  },
  {
    to: '/situaciones-didacticas',
    icon: Lightbulb,
    titulo: 'Situaciones Didácticas',
    descripcion: 'Diseño e implementación de situaciones didácticas en contextos reales.',
    color: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200 hover:border-amber-400',
  },
  {
    to: '/galeria',
    icon: Image,
    titulo: 'Fotos y Videos',
    descripcion: 'Galería multimedia con momentos significativos de nuestro proceso formativo.',
    color: 'bg-rose-100 text-rose-700',
    border: 'border-rose-200 hover:border-rose-400',
  },
  {
    to: '/autoevaluacion',
    icon: ClipboardCheck,
    titulo: 'Autoevaluación',
    descripcion: 'Reflexiones individuales sobre el proceso de aprendizaje y el crecimiento personal.',
    color: 'bg-indigo-100 text-indigo-700',
    border: 'border-indigo-200 hover:border-indigo-400',
  },
]

function Inicio() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 mb-6">
          <span className="text-4xl">📚</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Portafolio Pedagógico
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
          Grupo 3 · Licenciatura en Educación
        </p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Este portafolio reúne las evidencias, reflexiones y aprendizajes construidos colectivamente durante el semestre. Es un espacio vivo que da cuenta de nuestro proceso como futuras docentes.
        </p>
      </div>

      {/* Secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secciones.map((seccion) => {
          const Icon = seccion.icon
          return (
            <Link
              key={seccion.to}
              to={seccion.to}
              className={`group bg-white rounded-xl border-2 ${seccion.border} p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${seccion.color} mb-4`}>
                <Icon size={22} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-1">
                {seccion.titulo}
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-gray-400" />
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{seccion.descripcion}</p>
            </Link>
          )
        })}
      </div>

      {/* Nota editorial */}
      <div className="mt-16 bg-violet-50 border border-violet-200 rounded-xl p-6 text-center">
        <p className="text-violet-800 text-sm">
          <strong>Nota:</strong> Este portafolio es de fácil edición. Cada sección se actualiza modificando los archivos de la carpeta <code className="bg-violet-100 px-1 rounded">content/</code> sin necesidad de conocimientos técnicos.
        </p>
      </div>
    </div>
  )
}
