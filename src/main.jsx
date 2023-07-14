import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// react-query instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // react-query client provider
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
