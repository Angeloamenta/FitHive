import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import {CustomerProvider } from "./context/CustomerContext.jsx"



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <CustomerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CustomerProvider>
    </AuthProvider>
  </StrictMode>,
)
