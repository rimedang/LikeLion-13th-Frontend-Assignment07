import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './style/Globalstyle.js';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <App />
  </QueryClientProvider>
);
