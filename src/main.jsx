import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import ChatScreen from './pages/ChatScreen.jsx'
import AjudaScreen from './pages/AjudaScreen.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AjudaScreen />
  </StrictMode>,
)
