import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const integrantes = defineCollection({
  name: 'integrantes',
  directory: 'content/integrantes',
  include: '**/*.md',
  schema: z.object({
    nombre: z.string(),
    rol: z.string(),
    descripcion: z.string(),
    foto: z.string().optional(),
    orden: z.number().default(1),
  }),
})

const actividades = defineCollection({
  name: 'actividades',
  directory: 'content/actividades',
  include: '**/*.md',
  schema: z.object({
    titulo: z.string(),
    fecha: z.string(),
    descripcion: z.string(),
    imagen: z.string().optional(),
    tags: z.array(z.string()).default([]),
    orden: z.number().default(1),
  }),
})

const exposiciones = defineCollection({
  name: 'exposiciones',
  directory: 'content/exposiciones',
  include: '**/*.md',
  schema: z.object({
    titulo: z.string(),
    fecha: z.string(),
    descripcion: z.string(),
    imagen: z.string().optional(),
    integrante: z.string().optional(),
    archivo: z.string().optional(),
    orden: z.number().default(1),
  }),
})

const situacionesDidacticas = defineCollection({
  name: 'situacionesDidacticas',
  directory: 'content/situaciones-didacticas',
  include: '**/*.md',
  schema: z.object({
    titulo: z.string(),
    fecha: z.string(),
    descripcion: z.string(),
    imagen: z.string().optional(),
    objetivo: z.string().optional(),
    orden: z.number().default(1),
  }),
})

const galeria = defineCollection({
  name: 'galeria',
  directory: 'content/galeria',
  include: '**/*.md',
  schema: z.object({
    titulo: z.string(),
    tipo: z.enum(['foto', 'video']),
    url: z.string(),
    descripcion: z.string().optional(),
    fecha: z.string(),
    orden: z.number().default(1),
  }),
})

const autoevaluacion = defineCollection({
  name: 'autoevaluacion',
  directory: 'content/autoevaluacion',
  include: '**/*.md',
  schema: z.object({
    integrante: z.string(),
    periodo: z.string(),
    descripcion: z.string(),
    orden: z.number().default(1),
  }),
})

export default defineConfig({
  collections: [
    integrantes,
    actividades,
    exposiciones,
    situacionesDidacticas,
    galeria,
    autoevaluacion,
  ],
})
