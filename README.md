# Portafolio Pedagógico – Grupo 3

Sitio web de portafolio para una asignatura universitaria de Licenciatura en Educación. Permite a un grupo de 3 a 5 estudiantes documentar y presentar colectivamente su proceso formativo durante el semestre.

## Secciones

| Sección | Descripción |
|---|---|
| **Inicio** | Página principal con acceso a todas las secciones |
| **Quiénes Somos** | Perfil de cada integrante del grupo |
| **Actividades** | Registro de actividades académicas del semestre |
| **Exposiciones** | Presentaciones y ponencias realizadas |
| **Situaciones Didácticas** | Diseño e implementación de situaciones de aula |
| **Fotos y Videos** | Galería multimedia del proceso formativo |
| **Autoevaluación** | Reflexión individual de cada integrante |

## Tecnologías principales

- **TanStack Start** – framework React con SSR
- **TailwindCSS v4** – estilos
- **Content Collections** – gestión de contenido en Markdown
- **Netlify** – despliegue y hosting

## Cómo editar el contenido

Todo el contenido se gestiona editando archivos `.md` dentro de la carpeta `content/`:

```
content/
  integrantes/     → perfiles de las integrantes
  actividades/     → actividades del semestre
  exposiciones/    → exposiciones realizadas
  situaciones-didacticas/ → situaciones didácticas
  galeria/         → fotos y videos
  autoevaluacion/  → reflexiones individuales
```

Cada archivo tiene un bloque de metadatos al inicio (frontmatter) con campos como título, fecha y descripción, seguido del contenido en formato Markdown.

## Cómo ejecutar localmente

```bash
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.
