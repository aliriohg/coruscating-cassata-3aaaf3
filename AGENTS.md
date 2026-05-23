# AGENTS.md – Portafolio Pedagógico

Este documento describe la arquitectura del proyecto para desarrolladores y agentes de IA.

## Descripción del proyecto

Portafolio web para un grupo universitario de Licenciatura en Educación. Permite documentar el proceso formativo del semestre con secciones para perfiles de integrantes, actividades, exposiciones, situaciones didácticas, galería multimedia y autoevaluación.

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Estilos | Tailwind CSS 4 |
| Componentes UI | Radix UI + componentes custom |
| Contenido | Content Collections (Markdown con Zod) |
| Lenguaje | TypeScript 5 (strict mode) |
| Despliegue | Netlify |

## Estructura de directorios

```
src/
  routes/
    __root.tsx          → layout raíz (navbar + footer)
    index.tsx           → página de inicio
    quienes-somos.tsx   → perfiles de las integrantes
    actividades.tsx     → actividades del semestre
    exposiciones.tsx    → presentaciones realizadas
    situaciones-didacticas.tsx
    galeria.tsx         → fotos y videos
    autoevaluacion.tsx  → reflexiones individuales
  components/ui/        → Badge, Card, etc.
  styles.css            → estilos globales + tokens de color

content/                → fuente de verdad del contenido (Markdown)
  integrantes/
  actividades/
  exposiciones/
  situaciones-didacticas/
  galeria/
  autoevaluacion/

content-collections.ts  → schemas Zod de cada colección
```

## Gestión de contenido

Se usa `@content-collections/core`. Cada carpeta bajo `content/` es una colección con schema propio definido en `content-collections.ts`. Los archivos `.md` tienen frontmatter YAML validado con Zod.

**Nombres de exportaciones generadas:**
- `allIntegrantes`, `allActividades`, `allExposiciones`, `allSituacionesDidacticas`, `allGalerias`, `allAutoevaluacions`

Se importan en los routes desde `'content-collections'`.

## Routing

File-based routing de TanStack Router. Para agregar una nueva sección: crear archivo en `src/routes/` y agregar el link al array `navLinks` en `src/routes/__root.tsx`.

## Convenciones

- Fechas en frontmatter: formato `YYYY-MM-DD`
- Ordenamiento: campo numérico `orden` en el frontmatter
- Contenido Markdown: se parsea con `marked()` e inyecta con `dangerouslySetInnerHTML`
- Colores por sección: violeta (quiénes somos), azul (actividades), esmeralda (exposiciones), ámbar (situaciones didácticas), rosa (galería), índigo (autoevaluación)

## Decisiones de diseño

- El campo `content` en los schemas captura el cuerpo del archivo Markdown automáticamente (funcionalidad de content-collections)
- Los videos de YouTube requieren URL embed (`youtube.com/embed/VIDEO_ID`), no la URL normal
- No hay base de datos; todo el contenido vive en archivos `.md` para facilitar la edición por parte del grupo sin conocimientos técnicos
