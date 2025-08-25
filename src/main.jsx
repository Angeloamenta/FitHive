import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import { CustomerProvider } from "./context/CustomerContext.jsx"
import { CrudProvider } from './context/CrudContext.jsx'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <CustomerProvider>
        <CrudProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CrudProvider>
      </CustomerProvider>
    </AuthProvider>
  </StrictMode>,
)
