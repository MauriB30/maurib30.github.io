# Acuerdos del proyecto

- Este es el proyecto activo. Trabajar dentro de esta carpeta y revisar los cambios en localhost.
- La publicación final la realizará el usuario.
- Aplicar los cambios directamente en los archivos del proyecto. Entregar archivos completos para copiar cuando la edición directa no sea posible o el usuario lo pida.
- Usar pnpm como único gestor de paquetes.
- Ejecutar siempre los comandos del proyecto con pnpm.
- Mantener únicamente `pnpm-lock.yaml`.
- No crear ni conservar `package-lock.json`, `yarn.lock` u otros lockfiles.
- Antes de instalar cualquier dependencia adicional, explicar para qué sirve y pedir autorización.
- No sustituir ni agregar paquetes por iniciativa propia.
- Stack aprobado: Vite, React, TypeScript, Tailwind CSS, Prettier, Lucide React y PixiJS.
- El usuario autorizó `react-dom`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `@types/react`, `@types/react-dom` y `@types/node`.
- Las dependencias transitivas de los paquetes aprobados están incluidas.
- Seguir Atomic Design en la interfaz React.
- Mantener los datos en `src/data`.
- Mantener los tipos compartidos en `src/types`.
- Mantener el comportamiento reutilizable en `src/hooks`.
- Mantener los estilos globales en `src/styles`.
- Evitar lógica de negocio dentro de los componentes más pequeños.
- No crear carpetas `atoms`, `molecules` u `organisms` dentro de `src/scene`.
- No usar shadcn, Base UI, Next.js, Vinext, Sites ni herramientas de publicación.
- Conservar la estética de pixel art isométrico y la navegación de la habitación.
- Los datos personales y proyectos reales se completarán al final.

## Estructura de la interfaz React

```text
src/components/
├─ atoms/
├─ molecules/
├─ organisms/
└─ templates/
```

Los componentes deben mantener responsabilidades pequeñas y claras:

- `atoms`: elementos simples y reutilizables.
- `molecules`: grupos pequeños de elementos relacionados.
- `organisms`: secciones completas de la interfaz.
- `templates`: distribución general de las páginas.

## Estructura de la escena PixiJS

Usar nombres descriptivos según la responsabilidad de cada archivo.

```text
src/scene/
├─ architecture/
│  ├─ architecture.ts
│  ├─ floor.ts
│  ├─ floor-shadows.ts
│  ├─ room-layout.ts
│  ├─ walls.ts
│  ├─ window-view.ts
│  └─ window.ts
├─ composition/
│  ├─ objectCatalog.ts
│  ├─ sceneViewport.ts
│  └─ workspaceLayout.ts
├─ geometry/
│  ├─ pixel.ts
│  ├─ upholstery.ts
│  └─ wood-grain.ts
├─ interaction/
│  ├─ curtainMotion.ts
│  ├─ daylight.ts
│  ├─ lighting.ts
│  └─ snowfall.ts
├─ room-items/
│  ├─ bookcase.ts
│  ├─ books.ts
│  ├─ floor-lamp.ts
│  ├─ reading-chair.ts
│  ├─ chair.ts
│  ├─ desk.ts
│  ├─ desk-accessories.ts
│  ├─ electronics.ts
│  ├─ furniture.ts
│  ├─ keyboard.ts
│  ├─ mate.ts
│  ├─ monitor.ts
│  ├─ mouse.ts
│  ├─ mousepad.ts
│  ├─ pc-tower.ts
│  ├─ radiator.ts
│  ├─ thermos.ts
│  └─ wastebasket.ts
├─ createRoomScene.ts
├─ materials.ts
├─ spriteCache.ts
└─ types.ts
```

`src/scene` se encarga únicamente de la escena PixiJS.

La interfaz, los menús y la navegación React deben permanecer dentro de:

```text
src/components/
src/pages/
src/hooks/
src/data/
src/types/
src/styles/
```

## Reglas visuales

- Mantener el estilo de pixel art isométrico.
- El recinto mide 216 × 288 unidades: la pared de la ventana es la más larga. Las dimensiones se definen en `architecture/room-layout.ts`; `composition/sceneViewport.ts` calcula el lienzo, el origen y la proporción de la vista React sin escalar los muebles.
- Usar bordes definidos y píxeles nítidos.
- Evitar suavizado de imágenes y texturas.
- Respetar la perspectiva, la escala y la oclusión de los objetos.
- Colocar los objetos destinados a una pared lo más pegados posible al zócalo, sin atravesarlo. Calcular la separación desde su parte más ancha, incluida la pantalla de una lámpara. En las esquinas comprobar ambas paredes; acompañar la posición con sombras de contacto y el orden de oclusión correcto.
- Mantener la paleta oscura relacionada con el gris carbón en la interfaz.
- La habitación usa verde Salvia fijo. No volver a introducir un selector de paletas ni cambiar el color al pulsar las paredes.
- La escena es un espacio de trabajo: biblioteca abierta, sillón de lectura gris carbón y lámpara de pie con pantalla blanca y pie de madera reemplazan el ropero, la cama y la mesa de luz con velador.
- Biblioteca y escritorio comparten la madera roble oscura de `src/scene/materials.ts`. Las posiciones se comparten con sombras y luz mediante `composition/workspaceLayout.ts`.
- La biblioteca está junto al sillón sobre la pared de la ventana, con el frente hacia el centro. Dibujar libros, cajones y vetas en ese plano, sin voltear un sprite ni duplicar frentes.
- El escritorio va de x=58 a x=192, pegado a la pared; conserva PC y accesorios en su lugar. La papelera cilíndrica clara tiene borde enrollado y boca hundida; queda a la derecha, junto al zócalo, en x=203, y=10. La lámpara de pie tiene pantalla blanca acampanada y poste recto de madera; está en la esquina, en x=12, y=12; su altura es de 92 unidades y la pantalla tiene 11 de radio para mantener la proporción con los muebles. No conservar la mesa auxiliar redonda.
- Evitar violetas, rosas y elementos decorativos femeninos.
- Mantener los objetos de la habitación separados y fáciles de modificar. `furniture.ts` solo reexporta; cada mueble y sus libros se dibujan en módulos propios.
- La alfombra es una superficie verde continua con fibra corta, sin franjas que parezcan tablas.
- Las vetas se proyectan en cada cara del roble. El sillón tiene respaldo acolchado ligeramente reclinado, un asiento amplio, brazos redondeados y patas bajas. El tapizado permanece gris carbón liso, con costuras discretas. Sus volúmenes comparten perfiles abombados en `geometry/upholstery.ts`.
- La luz proyectada al suelo responde a las cortinas y queda detrás de los muebles. Al mover muebles, ajustar sus sombras en `architecture/floor-shadows.ts`.
- Separar la emisión de la pantalla y los LED del tinte ambiente: al apagar la habitación se oscurecen las carcasas, pero esas luces conservan su color. `electronics.ts` compone `monitor.ts` y `pc-tower.ts`.
- Las animaciones deben ser breves, claras y funcionales.
- La cortina solo debe animarse al abrirse y cerrarse.
- El exterior de la ventana tiene paisaje nevado, copos diurnos y noche con luna y estrellas. Recortar la nieve al vidrio, detrás del marco y las cortinas. Usar el reloj de la escena para respetar pausa y movimiento reducido.
- Mantener la ventana alta y un radiador blanco debajo, separado de las cortinas. Sus posiciones se relacionan mediante `windowLayout`.

## Dependencias

Toda dependencia directa nueva requiere:

1. Explicar para qué sirve.
2. Indicar por qué las herramientas existentes no son suficientes.
3. Pedir autorización antes de instalarla.

No instalar bibliotecas adicionales por iniciativa propia.
