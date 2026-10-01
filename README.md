# Mi espacio · Portafolio Nuevo

Portafolio local creado con Vite, React, TypeScript, Tailwind CSS, Prettier, Lucide React y PixiJS.

El proyecto se ejecuta en localhost. La publicación final la realizará el usuario.

## Iniciar

Desde la carpeta del proyecto:

```sh
pnpm install
pnpm dev
```

Abrir http://localhost:3000/.

Comandos disponibles:

```sh
pnpm format
pnpm format:check
pnpm typecheck
pnpm build
pnpm preview
```

## Organización

```text
src/
  components/
    atoms/
    molecules/
    organisms/
    templates/
  pages/
  hooks/
  data/
  types/
  scene/
    architecture/
      architecture.ts
      floor.ts
      floor-shadows.ts
      room-layout.ts
      walls.ts
      window-view.ts
      window.ts
    composition/
      objectCatalog.ts
      sceneViewport.ts
      workspaceLayout.ts
    geometry/
      pixel.ts
      upholstery.ts
      wood-grain.ts
    interaction/
      curtainMotion.ts
      daylight.ts
      lighting.ts
      snowfall.ts
    room-items/
      bookcase.ts
      books.ts
      floor-lamp.ts
      reading-chair.ts
      chair.ts
      desk.ts
      desk-accessories.ts
      electronics.ts
      furniture.ts
      keyboard.ts
      mate.ts
      monitor.ts
      mouse.ts
      mousepad.ts
      pc-tower.ts
      radiator.ts
      thermos.ts
      wastebasket.ts

    createRoomScene.ts
    materials.ts
    spriteCache.ts
    types.ts
  styles/
```

La interfaz React sigue Atomic Design. PixiJS se utiliza únicamente para construir la habitación interactiva.

Los objetos se dibujan con código en una cuadrícula de 584 × 500, sin suavizado, usando una estética de pixel art isométrico.

## Personalización

- Contenido personal y proyectos: `src/data/portfolio.ts`.
- Colores y configuraciones: `src/data/roomSettings.ts`.
- Objetos de la habitación: `src/scene/room-items/`.
- Arquitectura de la habitación: `src/scene/architecture/`.

La habitación incluye:

- Sillón de lectura tapizado en gris carbón.
- Lámpara de pie con pantalla blanca acampanada, poste de madera y luz cálida, junto a la esquina.
- Piso de 216 × 288 unidades con alfombra verde oscura, fibra corta y sombras de apoyo; muebles a su escala original.
- Escritorio extendido de madera roble oscuro, con más superficie libre.
- Papelera cilíndrica clara con borde enrollado y boca hundida, junto a la pared a la derecha del escritorio.
- Computadora gamer con margen respecto del borde del escritorio.
- Mouse blanco sobre un pad amplio.
- Monitor sin logotipo, con pantalla y LED que conservan su luz en el modo nocturno.
- Reflejo tenue del monitor sobre la madera, debajo de los accesorios.
- Silla negra.
- Termo y mate argentino.
- Biblioteca de roble junto al sillón, orientada hacia el centro desde la pared de la ventana.
- Ventana alta, con espacio de pared libre debajo.
- Paisaje nevado con copos suaves; de noche, luna creciente, estrellas y ventanas cálidas a lo lejos. La nieve y las estrellas respetan la pausa y el movimiento reducido.
- Radiador blanco fijado a la pared bajo la ventana.
- Cortinas con animación de abrir y cerrar, por encima del radiador.
- Luz de los cuatro cristales proyectada al suelo, sincronizada con las cortinas.
- Vetas de roble y tapizados proyectados sobre las caras de cada objeto.

La habitación conserva siempre la paleta verde Salvia. Los ajustes permiten abrir o cerrar cortinas, activar animaciones y restablecer estas preferencias, que se guardan localmente mediante `localStorage`.

## Interacciones

- Computadora → proyectos.
- Foto → presentación.
- Corcho → contacto.
- Paredes en verde Salvia fijo.
- Piso → mostrar textura.
- Ventana → abrir o cerrar cortinas.
- Lámpara de pie → cambiar iluminación.
- Biblioteca, sillón, escritorio y papelera → mostrar mensajes del espacio de trabajo.

La escena respeta la preferencia de movimiento reducido y libera sus recursos al desmontarse.

## Dependencias autorizadas

- Aplicación: `react`, `react-dom`, `lucide-react`, `pixi.js`.
- Desarrollo: `vite`, `typescript`, `tailwindcss`, `prettier`.
- Integración y tipos: `@vitejs/plugin-react`, `@tailwindcss/vite`, `@types/react`, `@types/react-dom`, `@types/node`.

Toda dependencia directa adicional requiere explicación y autorización.

## Gestor de paquetes

Este proyecto utiliza únicamente pnpm.

Debe conservarse solamente:

```text
pnpm-lock.yaml
```

No se deben crear ni conservar `package-lock.json`, `yarn.lock` u otros lockfiles.
