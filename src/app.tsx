import { createRoot } from 'react-dom/client';

import App from '@/components/global/App';
import GlobalProvider from '@/providers';

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);