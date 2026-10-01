import { Mail } from 'lucide-react';
import type { Portfolio } from '../../types/portfolio';
import { Icon } from '../atoms/Icon';

export function ContactSection({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className='contact-content'>
      <p>{portfolio.availability}</p>
      <p className='contact-location'>{portfolio.location}</p>
      {portfolio.email ? (
        <div className='contact-actions'>
          <a className='contact-action' href={`mailto:${portfolio.email}`}>
            <Icon icon={Mail} size={18} />
            Escribime
          </a>
        </div>
      ) : (
        <p className='contact-pending'>
          Mis canales de contacto estarán disponibles próximamente.
        </p>
      )}
      {portfolio.links.length > 0 && (
        <div className='profile-links'>
          {portfolio.links.map((link) => (
            <a key={link.label} href={link.url} target='_blank' rel='noreferrer'>
              {link.label === 'LinkedIn' && (
                <img
                  className='social-icon'
                  src='/icons/devicon/linkedin.svg'
                  width={18}
                  height={18}
                  alt=''
                  aria-hidden='true'
                />
              )}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
