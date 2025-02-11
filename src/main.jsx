import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from '../src/context/AppContext.jsx'
import { Toaster } from 'react-hot-toast'

// window.apiURL = "http://localhost:8080/api/v1"4
window.apiURL = "https://hrms-backend-plum.vercel.app/api/v1";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
