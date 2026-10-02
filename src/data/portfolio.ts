import type { Portfolio } from '../types/portfolio';

export const portfolio: Portfolio = {
  name: 'Mauricio Blanco',
  role: 'Desarrollador Web Full Stack Junior',
  intro:
    'Desarrollo proyectos personales con React y Node.js y busco mi primera oportunidad laboral en desarrollo.',
  note: 'Trabajo principalmente con JavaScript, TypeScript, React y Node.js. Mi formación en Análisis de Sistemas y QA me ayuda a abordar los problemas con lógica y atención al detalle. También incorporo herramientas de IA a mi proceso, revisando el código y cada cambio antes de integrarlo.',
  location: 'Ushuaia, Tierra del Fuego, Argentina',
  availability:
    'Disponibilidad inmediata. Abierto a oportunidades remotas, híbridas o presenciales.',
  languages: ['Inglés B2: lectura de documentación técnica y comunicación escrita.'],
  email: 'mauriblanco29@gmail.com',
  links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/mauri-blanco' }],
  technologies: [
    {
      title: 'Frontend',
      items: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Vite',
        'Tailwind CSS',
      ],
    },
    {
      title: 'Ecosistema React',
      items: ['Context', 'React Router', 'TanStack Query', 'React Hook Form', 'Zod'],
    },
    {
      title: 'Backend y bases de datos',
      items: ['Node.js', 'Express', 'APIs REST', 'MongoDB', 'Mongoose'],
    },
    {
      title: 'Herramientas y pruebas de APIs',
      items: ['Git', 'GitHub', 'Fork', 'Thunder Client', 'Postman'],
    },
    {
      title: 'Despliegue',
      items: ['Vercel', 'Render', 'MongoDB Atlas'],
    },
    {
      title: 'Desarrollo asistido por IA',
      items: ['Codex', 'Claude Code', 'GitHub Copilot', 'Gemini'],
    },
    {
      title: 'Conocimientos aplicados en proyectos de práctica',
      items: ['PostgreSQL', 'SQL', 'Prisma'],
    },
  ],
  projects: [
    {
      id: 'cerogasto',
      name: 'CeroGasto',
      category: 'Finanzas personales',
      status: 'En producción',
      description:
        'Aplicación web para gestionar billeteras, gastos, cuotas y movimientos recurrentes, con filtros y resúmenes financieros. Proyecto personal iniciado en mayo de 2026; desarrollé tanto el frontend como el backend.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
      highlights: [
        'Backend organizado en rutas, middleware, controladores, servicios y repositorios, con validación de solicitudes y manejo centralizado de errores.',
        'Autenticación con JWT, contraseñas protegidas con bcrypt, acceso por usuario, límites de solicitudes y recuperación de contraseña por email con Resend.',
        'Agregaciones para los resúmenes, relaciones con populate, índices de búsqueda y transacciones para confirmar o revertir operaciones relacionadas.',
        'Despliegue en Vercel y Render con MongoDB Atlas. Pruebas manuales de la aplicación y sus APIs, y diagnóstico de errores mediante logs.',
      ],
      visitNote:
        'El primer acceso puede demorar porque el backend está alojado en un plan gratuito.',
      url: 'https://www.cerogasto.com.ar',
    },
  ],
  education: [
    {
      title: 'Análisis de Sistemas',
      organization: 'UNTDF',
      description: 'Segundo año completado. Estudios pausados; carrera sin finalizar.',
    },
    {
      title: 'Curso de QA',
      organization: 'T.TEC/EGG',
      period: 'Marzo de 2022 a noviembre de 2023',
      description: 'Testing manual e introducción a la automatización de pruebas.',
    },
  ],
  experience: [
    {
      title: 'Operario de producción',
      organization: 'Newsan',
      period: 'Marzo de 2024 a enero de 2026',
    },
    {
      title: 'Técnico informático',
      organization: 'Centec',
      period: 'Noviembre de 2023',
      description:
        'Transmisión de actas electorales y soporte técnico en tiempo real. Configuración de equipos y resolución de problemas de red y hardware.',
    },
    {
      title: 'Botones',
      organization: 'Hotel Arakur',
      period: '2019 a 2020',
    },
    {
      title: 'Recepcionista',
      organization: 'Hotel Ushuaia',
      period: '2016 a 2017',
    },
  ],
};
