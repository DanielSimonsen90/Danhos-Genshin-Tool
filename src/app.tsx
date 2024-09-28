import { createRoot } from 'react-dom/client';
import App from './components/App';
import * as services from '@/services';
import * as stores from '@/stores';

createRoot(document.getElementById('root')!).render(<App />);

window.__services = services;
window.__stores = stores;

declare global {
  interface Window {
    __services: typeof services;
    __stores: typeof stores;
  }
}