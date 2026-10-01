import type { ReviewObjectInfo } from '../types/objectReview';

export const reviewObjects: ReviewObjectInfo[] = [
  {
    id: 'reading-chair',
    name: 'Sillón de lectura',
    roomId: 'reading-chair',
    source: 'room-items/reading-chair.ts',
    checks: [
      'Asiento amplio y brazos redondeados, sin parecer una caja.',
      'Patas bajas, respaldo reclinado y tapizado gris carbón.',
    ],
  },
  {
    id: 'lamp',
    name: 'Lámpara de pie',
    roomId: 'lamp',
    source: 'room-items/floor-lamp.ts',
    checks: [
      'Pantalla blanca acampanada y poste recto de madera.',
      'Comparar su tamaño con el escritorio; revisar las dos paredes de la esquina.',
    ],
  },
  {
    id: 'bookcase',
    name: 'Biblioteca',
    roomId: 'bookcase',
    source: 'room-items/bookcase.ts',
    checks: [
      'Frente hacia el centro, con huecos y baldas distinguibles.',
      'Mismo roble oscuro del escritorio; junto al sillón.',
    ],
  },
  {
    id: 'desk',
    name: 'Escritorio con accesorios',
    roomId: 'desk',
    source: 'room-items/desk.ts',
    checks: [
      'Tablero sostenido, sin cajones y pegado a la pared.',
      'Accesorios contenidos dentro del tablero, con margen hasta el borde.',
    ],
  },
  {
    id: 'chair',
    name: 'Silla de escritorio',
    roomId: 'chair',
    source: 'room-items/chair.ts',
    checks: [
      'Negra, con asiento, respaldo, apoyabrazos y base distinguibles.',
      'Asiento por debajo del tablero, con espacio para las piernas.',
    ],
  },
  {
    id: 'projects',
    name: 'Computadora completa',
    roomId: 'projects',
    source: 'room-items/electronics.ts',
    checks: [
      'Monitor y gabinete separados, sin superponerse al teclado.',
      'Pantalla y LED conservan su color de noche.',
    ],
  },
  {
    id: 'monitor',
    name: 'Monitor',
    roomId: 'projects',
    source: 'room-items/monitor.ts',
    checks: [
      'Soporte conectado a la base y marco sin logotipo.',
      'Contenido dentro de la pantalla; no tapar el teclado.',
    ],
  },
  {
    id: 'pc-tower',
    name: 'Gabinete gamer',
    roomId: 'projects',
    source: 'room-items/pc-tower.ts',
    checks: [
      'Frente y lateral diferenciados, ventiladores en sus planos.',
      'LED separados de la carcasa; margen hasta el borde de la mesa.',
    ],
  },
  {
    id: 'keyboard',
    name: 'Teclado',
    roomId: 'desk',
    source: 'room-items/keyboard.ts',
    checks: [
      'Teclas legibles sobre el plano del tablero.',
      'Dejar espacio para el mouse y no quedar bajo la base del monitor.',
    ],
  },
  {
    id: 'mousepad',
    name: 'Pad',
    roomId: 'mousepad',
    source: 'room-items/mousepad.ts',
    checks: [
      'Superficie amplia, oscura y adherida al tablero.',
      'Mouse contenido en el pad y pad dentro del escritorio.',
    ],
  },
  {
    id: 'mouse',
    name: 'Mouse blanco',
    roomId: 'mouse',
    source: 'room-items/mouse.ts',
    checks: [
      'Carcasa blanca redondeada, botones y rueda distinguibles.',
      'Apoyo coherente sobre el pad, sin quedar al borde.',
    ],
  },
  {
    id: 'mate',
    name: 'Mate argentino',
    roomId: 'desk',
    source: 'room-items/mate.ts',
    checks: [
      'Cuerpo abombado, borde y yerba dentro de la abertura.',
      'Bombilla continua que nace dentro del mate, sin parecer un asa.',
    ],
  },
  {
    id: 'thermos',
    name: 'Termo',
    roomId: 'desk',
    source: 'room-items/thermos.ts',
    checks: [
      'Cuerpo, cuello, tapa y hueco del asa reconocibles.',
      'Comparar con el mate; reflejos controlados, sin ruido excesivo.',
    ],
  },
  {
    id: 'wastebasket',
    name: 'Papelera',
    roomId: 'wastebasket',
    source: 'room-items/wastebasket.ts',
    checks: [
      'Cilindro claro con boca hundida y borde enrollado.',
      'A la derecha del escritorio, contra el zócalo, sin atravesarlo.',
    ],
  },
  {
    id: 'window',
    name: 'Ventana y cortinas',
    roomId: 'window',
    source: 'architecture/window.ts',
    checks: [
      'Ventana alta; exterior y nieve recortados al vidrio.',
      'Cortinas quietas en reposo, sin invadir el radiador.',
    ],
  },
  {
    id: 'radiator',
    name: 'Radiador blanco',
    roomId: 'radiator',
    source: 'room-items/radiator.ts',
    checks: [
      'Blanco, fijado a la pared y debajo de la ventana.',
      'Canales y soportes legibles; separado de las cortinas.',
    ],
  },
  {
    id: 'technologies',
    name: 'Pizarra de tecnologías',
    roomId: 'technologies',
    source: 'room-items/whiteboard.ts',
    checks: [
      'React, JS y TS dibujados sobre el mismo plano.',
      'Visible detrás de la lámpara; dirección según la pantalla.',
    ],
  },
  {
    id: 'contact',
    name: 'Corcho',
    roomId: 'contact',
    source: 'architecture/architecture.ts',
    checks: [
      'Marco de roble y notas adheridas al plano de la pared.',
      'Visible junto al sillón; no confundirse con la pizarra.',
    ],
  },
  {
    id: 'about',
    name: 'Cuadro',
    roomId: 'about',
    source: 'architecture/architecture.ts',
    checks: [
      'Marco y dibujo distinguibles a tamaño normal.',
      'Suficientemente alto para verse por encima de la computadora.',
    ],
  },
  {
    id: 'door',
    name: 'Puerta',
    roomId: 'door',
    source: 'room-items/door.ts',
    checks: [
      'Hoja de madera, marco y manija conectados.',
      'Revisar el apoyo en el borde frontal y el contraste del umbral con el piso.',
    ],
  },
];

export const roomReviewGuide = [
  {
    name: 'Paredes',
    color: '#9aac94',
    detail: 'Salvia fijo; revisar también la cara en sombra.',
  },
  {
    name: 'Piso',
    color: '#304e43',
    detail: 'Alfombra verde oscura continua, con fibra discreta.',
  },
  {
    name: 'Roble',
    color: '#694630',
    detail: 'Escritorio y biblioteca comparten material y dirección de vetas.',
  },
  {
    name: 'Tapizado',
    color: '#536064',
    detail: 'Gris carbón liso, con volumen y costuras discretas.',
  },
  {
    name: 'Plástico negro',
    color: '#202a2f',
    detail: 'Separar caras oscuras con valores, sin perder el negro.',
  },
  {
    name: 'Metal claro',
    color: '#c9cecd',
    detail: 'Brillos concentrados y cantos legibles.',
  },
];

export const reviewChecklist = [
  'Se reconoce la silueta a 1× y en la habitación.',
  'Las proporciones coinciden con la referencia y los vecinos.',
  'Caras, curvas y detalles respetan la proyección.',
  'Apoya sobre piso, mesa o pared sin flotar ni atravesar.',
  'Textura y sombras acompañan el material sin tapar la forma.',
  'De día y de noche conserva sus rasgos y colores pedidos.',
];
