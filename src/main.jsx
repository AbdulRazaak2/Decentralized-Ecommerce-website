import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { WalletProvider } from './context/WalletContext'
import { ProductProvider } from './context/ProductContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <ProductProvider>
          <App />
          <ToastContainer position="bottom-right" theme="colored" />
        </ProductProvider>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>,
)