import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'
import Auth0ProviderConfigured from './components/Auth0ProviderConfigured'

import App from './App'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth0ProviderConfigured>
          <App />
        </Auth0ProviderConfigured>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
