import { Code2 } from 'lucide-react';
import { technologyLogos, technologySymbols } from '../../data/technologyIcons';
import { Icon } from './Icon';

export function TechnologyIcon({ name }: { name: string }) {
  const logo = technologyLogos[name];
  if (!logo) {
    return (
      <Icon
        icon={technologySymbols[name] ?? Code2}
        size={24}
        className='technology-symbol'
      />
    );
  }

  return (
    <img
      className={
        'technology-icon' + (logo.monochrome ? ' technology-icon-monochrome' : '')
      }
      src={'/icons/devicon/' + logo.file + '.svg'}
      width={24}
      height={24}
      alt=''
      aria-hidden='true'
      decoding='async'
    />
  );
}
