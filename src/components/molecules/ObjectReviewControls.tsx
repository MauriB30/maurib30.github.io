import { reviewObjects } from '../../data/objectReview';
import type { ObjectReviewSettings, ReviewObjectId } from '../../types/objectReview';

interface Props {
  settings: ObjectReviewSettings;
  onChange: (patch: Partial<ObjectReviewSettings>) => void;
}
export function ObjectReviewControls({ settings, onChange }: Props) {
  return (
    <div className='object-review-controls'>
      <label>
        Objeto
        <select
          value={settings.selected}
          onChange={(event) =>
            onChange({ selected: event.target.value as ReviewObjectId })
          }
        >
          {reviewObjects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Comparar con
        <select
          value={settings.comparison}
          onChange={(event) =>
            onChange({
              comparison: event.target.value as ObjectReviewSettings['comparison'],
            })
          }
        >
          <option value='none'>Sin comparación</option>
          {reviewObjects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Escala de píxel
        <select
          value={settings.zoom}
          onChange={(event) =>
            onChange({ zoom: Number(event.target.value) as ObjectReviewSettings['zoom'] })
          }
        >
          <option value={1}>1× · tamaño original</option>
          <option value={2}>2×</option>
          <option value={4}>4× · revisar detalles</option>
        </select>
      </label>
      <fieldset>
        <legend>Iluminación de la escena</legend>
        <button
          type='button'
          aria-pressed={!settings.night}
          onClick={() => onChange({ night: false })}
        >
          Día
        </button>
        <button
          type='button'
          aria-pressed={settings.night}
          onClick={() => onChange({ night: true })}
        >
          Noche
        </button>
      </fieldset>
      <label className='object-review-checkbox'>
        <input
          type='checkbox'
          checked={settings.curtainsOpen}
          onChange={(event) => onChange({ curtainsOpen: event.target.checked })}
        />
        Cortinas abiertas
      </label>
      <label className='object-review-checkbox'>
        <input
          type='checkbox'
          checked={settings.guides}
          onChange={(event) => onChange({ guides: event.target.checked })}
        />
        Grilla y guías
      </label>
    </div>
  );
}
