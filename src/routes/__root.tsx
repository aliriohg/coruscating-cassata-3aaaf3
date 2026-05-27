import { Link, Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'
import '../styles.css'

const navLinks = [
  { to: '/' as const, label: 'Inicio' },
  { to: '/quienes-somos' as const, label: 'Quiénes Somos' },
  { to: '/actividades' as const, label: 'Actividades' },
  { to: '/exposiciones' as const, label: 'Exposiciones' },
  { to: '/situaciones-didacticas' as const, label: 'Sit. Didácticas' },
  { to: '/galeria' as const, label: 'Fotos y Videos' },
  { to: '/autoevaluacion' as const, label: 'Autoevaluación' },
]

export const Route = createRootRoute({
  component: RootLayout,
})

function NavBar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-violet-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity">
          <GraduationCap size={24} />
          <span>Portafolio Pedagógico</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-violet-700'
                    : 'hover:bg-violet-600 text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-violet-600 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden bg-violet-800 px-4 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-violet-700'
                    : 'hover:bg-violet-700 text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}

function RootLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer className="bg-violet-700 text-white text-center py-4 text-sm mt-12">
        <p>Portafolio Pedagógico · Grupo 3 · {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}
