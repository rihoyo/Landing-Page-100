import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { loadApp } from './App';

// Keep the pre-rendered screen visible while connecting form and click handlers.
void loadApp().then(app => {
  const root = document.getElementById('root')!;
  const screen = <StrictMode>{app}</StrictMode>;
  if (root.hasChildNodes()) hydrateRoot(root, screen);
  else createRoot(root).render(screen);
});
