import React from 'react';
import ReactDOM from 'react-dom/client';
import '@rainbow-me/rainbowkit/styles.css';
import './styles.css';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.jsx';

const projectId = '657c76b436df4cbecbb8fc273014e715';

const config = getDefaultConfig({
  appName: 'Koalified Campus',
  projectId,
  chains: [mainnet, base],
  ssr: false,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
