# Mauricio Blanco · Portafolio

Portafolio personal con una oficina interactiva en pixel art isométrico. La habitación acompaña la presentación de mi perfil, proyectos, tecnologías y canales de contacto: sus objetos también permiten recorrer las secciones.

[Ver portafolio](https://maurib30.github.io/)

## La experiencia

- Navegación desde los objetos de la habitación y las pestañas del perfil.
- Temas claro y oscuro vinculados a la lámpara.
- Ventana con paisaje nevado de día, luna y estrellas de noche, y cortinas que se abren y cierran.
- Globos de texto que identifican los objetos asociados a una sección.
- Tecnologías representadas con iconos y nombres al pasar el cursor.
- Diseño adaptable a escritorio y móvil, navegación por teclado y soporte para movimiento reducido.

## Tecnologías

| Área               | Herramientas                     |
| ------------------ | -------------------------------- |
| Interfaz           | React, TypeScript y Tailwind CSS |
| Escena interactiva | PixiJS                           |
| Iconos             | Lucide React y SVG de Devicon    |
| Tipografía         | Oxanium                          |
| Desarrollo         | Vite, pnpm y Prettier            |
| Publicación        | GitHub Pages y GitHub Actions    |

La escena combina sprites WebP con transparencia, geometría e iluminación en PixiJS. Los objetos se mantienen separados para conservar sus interacciones y facilitar los cambios en la habitación.

## Desarrollo local

El proyecto utiliza Node.js 24 y pnpm. La versión del gestor está definida en `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

La aplicación está disponible en [localhost:3000](http://localhost:3000/).

| Comando             | Descripción                                            |
| ------------------- | ------------------------------------------------------ |
| `pnpm build`        | Verifica TypeScript y genera la compilación en `dist`. |
| `pnpm preview`      | Sirve la compilación localmente en el puerto 4173.     |
| `pnpm typecheck`    | Verifica los tipos de TypeScript.                      |
| `pnpm format`       | Aplica el formato de Prettier.                         |
| `pnpm format:check` | Comprueba el formato sin modificar archivos.           |

El [visor de objetos](http://localhost:3000/?visor=objetos) permite revisar las piezas de la escena durante el desarrollo. Está disponible únicamente en ese entorno.

## Organización

```text
src/
├─ assets/       # Sprites y recursos visuales
├─ components/   # Interfaz React organizada con Atomic Design
├─ data/         # Contenido del perfil, proyectos y configuración
├─ hooks/        # Estado y comportamiento reutilizable
├─ pages/        # Páginas del portafolio y del visor de objetos
├─ scene/        # Arquitectura, objetos, composición e interacciones de PixiJS
├─ styles/       # Estilos de la interfaz
└─ types/        # Tipos compartidos
```

Los componentes React se distribuyen en `atoms`, `molecules`, `organisms` y `templates`. La escena utiliza módulos por responsabilidad y un archivo propio para cada objeto de la habitación.

## Publicación

GitHub Actions instala las dependencias con pnpm, compila el proyecto y publica la carpeta `dist` en GitHub Pages cuando se suben cambios a `main`. El flujo está definido en [deploy.yml](.github/workflows/deploy.yml).
