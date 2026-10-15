import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import Home from './pages/home/page';
import Health from './pages/health/page';
import Cancer from './pages/cancer/page';

// Runs only during build. Every URL gets its own completed screen in the HTML.
export function render(pageId: 'aa0001' | 'aa0002' | 'aa0003' | 'aa0004') {
  return renderToString(
    <StrictMode>
      {pageId === 'aa0004' ? (
        <Cancer />
      ) : pageId === 'aa0003' ? (
        <Health />
      ) : (
        <Home pageId={pageId} />
      )}
    </StrictMode>,
  );
}
