import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { AppContextProvider } from './contexts/AppContext.jsx'
import { InputContextProvider } from './contexts/InputContext.jsx'
import { SmallerComponentsContextProvider } from './contexts/SmallerComponentsContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthContextProvider>
        <AppContextProvider>
          <SmallerComponentsContextProvider>
            <InputContextProvider>
              <App/>
            </InputContextProvider>
          </SmallerComponentsContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </StrictMode>
  </BrowserRouter>
  
  
)
