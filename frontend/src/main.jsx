import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  < GoogleOAuthProvider clientId='234340568670-027jkb459i6l5msgcpc6d7ejbgp9h5b3.apps.googleusercontent.com'>
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
)
