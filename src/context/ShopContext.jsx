import { createContext, useContext, useCallback } from 'react';
import { useCart } from './CartContext';
import { useCustomer } from './CustomerContext';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const { cart, dispatch: cartDispatch, cartCount, cartTotal } = useCart();
  const { goldBalance, purchaseHistory, dispatch: customerDispatch } = useCustomer();

  const addToCart = useCallback((wand) => {
    cartDispatch({ type: 'ADD_TO_CART', wand });
  }, [cartDispatch]);

  const removeFromCart = useCallback((wandId) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', wandId });
  }, [cartDispatch]);

  const updateQuantity = useCallback((wandId, quantity) => {
    cartDispatch({ type: 'UPDATE_QUANTITY', wandId, quantity });
  }, [cartDispatch]);

  const checkout = useCallback(() => {
    if (cart.length === 0) return null;
    if (cartTotal > goldBalance) return null;

    const order = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotal,
      remainingBalance: goldBalance - cartTotal,
    };

    customerDispatch({ type: 'ADD_PURCHASE', order });
    cartDispatch({ type: 'CLEAR_CART' });
    return order;
  }, [cart, cartTotal, goldBalance, cartDispatch, customerDispatch]);

  return (
    <ShopContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      goldBalance,
      purchaseHistory,
      checkout,
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
