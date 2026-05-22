import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'fizban_cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.find(item => item.id === action.wand.id);
      if (existing) {
        return state.map(item =>
          item.id === action.wand.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.wand, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.wandId);
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return state.filter(item => item.id !== action.wandId);
      }
      return state.map(item =>
        item.id === action.wandId
          ? { ...item, quantity: action.quantity }
          : item
      );
    }
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = { cart, dispatch, cartCount, cartTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
