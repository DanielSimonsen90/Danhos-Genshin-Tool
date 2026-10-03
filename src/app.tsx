import { createRoot } from 'react-dom/client';

import App from '@/components/global/App';
import GlobalProvider from '@/providers';
import { required } from '@/common/functions/object';

createRoot(required(document.getElementById('root'), 'Root element not found')).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);