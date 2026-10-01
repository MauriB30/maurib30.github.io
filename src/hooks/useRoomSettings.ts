import { useEffect, useState } from 'react';
import { readRoomSettings, roomStorageKey } from '../data/roomSettings';
import type { SceneObjectId } from '../types/room';

export function useRoomSettings() {
  const [settings, setSettings] = useState(readRoomSettings);
  const [notice, setNotice] = useState('Cada objeto guarda una pequeña sorpresa.');
  useEffect(() => {
    try {
      localStorage.setItem(roomStorageKey, JSON.stringify(settings));
    } catch {
      // Si el almacenamiento no está disponible, las preferencias duran esta visita.
    }
  }, [settings]);
  function interact(id: SceneObjectId) {
    switch (id) {
      case 'floor':
        setNotice('Una alfombra verde oscura cubre todo el piso.');
        break;
      case 'window':
        setSettings((s) => ({ ...s, curtainsOpen: !s.curtainsOpen }));
        setNotice('Un poco de luz desde la ventana.');
        break;
      case 'reading-chair':
        setNotice('Un sillón para leer, revisar ideas y despejar la cabeza.');
        break;
      case 'wastebasket':
        setNotice('Un lugar para los borradores y las ideas que ya cumplieron su parte.');
        break;
      case 'desk':
        setNotice('El escritorio forma parte de este rincón.');
        break;
      case 'bookcase':
        setNotice('Libros, carpetas y apuntes para seguir aprendiendo.');
        break;
      case 'chair':
        setNotice('Una vuelta antes de volver a crear.');
        break;
      case 'lamp':
        setNotice('La misma habitación, otra luz.');
        break;
    }
  }
  return {
    settings,
    notice,
    interact,
  };
}
