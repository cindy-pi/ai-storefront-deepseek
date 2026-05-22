import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CustomerProvider } from './context/CustomerContext';
import { ShopProvider } from './context/ShopContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <CustomerProvider>
          <ShopProvider>
            <App />
          </ShopProvider>
        </CustomerProvider>
      </CartProvider>
    </HashRouter>
  </React.StrictMode>
);
