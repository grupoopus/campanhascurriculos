import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'
import Auth0ProviderWithRedirectCallback from './components/Auth0ProviderWithRedirectCallback'

import App from './App'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth0ProviderWithRedirectCallback>
          <App />
        </Auth0ProviderWithRedirectCallback>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
