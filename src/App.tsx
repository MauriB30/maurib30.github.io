import { lazy, Suspense } from 'react';
import { PortfolioPage } from './pages/PortfolioPage';

const ObjectReviewPage = import.meta.env.DEV
  ? lazy(() => import('./pages/ObjectReviewPage'))
  : null;

export default function App() {
  if (
    ObjectReviewPage &&
    new URLSearchParams(window.location.search).get('visor') === 'objetos'
  ) {
    return (
      <Suspense fallback={<p role='status'>Cargando el visor…</p>}>
        <ObjectReviewPage />
      </Suspense>
    );
  }
  return <PortfolioPage />;
}
