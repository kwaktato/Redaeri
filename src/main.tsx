import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/style/GlobalStyle.tsx';
import CustomRoute from '@/components/route/route.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

async function init() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser.ts');

    return worker.start();
  }
}
await init();

const theme = {
  colors: {
    'primary-100': '#D5E9FF',
    'primary-200': '#AAD3FF',
    'primary-300': '#80BDFF',
    'primary-400': '#55A7FF',
    'primary-500': '#2B91FF',
    'primary-600': '#2274CC',
    'primary-700': '#1A5799',
    'primary-800': '#113A66',
    'primary-900': '#091D33',

    'secondary-100': '#FFF4CC',
    'secondary-200': '#FFE999',
    'secondary-300': '#FFDE66',
    'secondary-400': '#FFD333',
    'secondary-500': '#FFC800',
    'secondary-600': '#CCA000',
    'secondary-700': '#997800',
    'secondary-800': '#665000',
    'secondary-900': '#332800',

    'gray-100': '#F3F7FA',
    'gray-200': '#E6EAEE',
    'gray-300': '#D9DFE5',
    'gray-400': '#CCD4DD',
    'gray-500': '#BFC9D4',
    'gray-600': '#99A1AA',
    'gray-700': '#73797F',
    'gray-800': '#4D5155',
    'gray-900': '#26282A',

    'neutral-100': '#F3F7FA',
    'neutral-200': '#D9DFE5',
    'neutral-300': '#BFC9D4',
    'neutral-400': '#73797F',
    'neutral-500': '#4D5155',
    'neutral-600': '#26282A',

    'point-100': '#FF8539',
    'point-200': '#AACAE6',
    'point-300': '#FFF495',
    'point-400': '#FFE351',
    'point-500': '#2CD2BB',
    'point-600': '#00AAD2',

    error: '#FF4D4D',
    black: '#000000',
    white: '#FFFFFF',
  },
};

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <CustomRoute />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
