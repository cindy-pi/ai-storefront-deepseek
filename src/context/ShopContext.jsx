import { createContext, useContext, useCallback } from 'react';
import { useCart } from './CartContext';
import { useCustomer } from './CustomerContext';

const FIZBAN_MESSAGES = [
  "Bah! Your wands are on their way. Try not to lose them this time!",
  "Ah, excellent taste! I may have accidentally enchanted these extra. You're welcome.",
  "The dragons approve of your selection. Well, most of them.",
  "Your order has been dispatched via my most reliable dragon courier. He's mostly reliable.",
  "Splendid! I cast the delivery spell myself. Only singed my beard a little.",
];

function generateOrderId() {
  return Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const { cart, dispatch: cartDispatch, cartCount, cartTotal } = useCart();
  const { goldBalance, purchaseHistory, lastOrder, setLastOrder, clearLastOrder, dispatch: customerDispatch } = useCustomer();

  const addToCart = useCallback((wand) => {
    cartDispatch({ type: 'ADD_TO_CART', wand });
  }, [cartDispatch]);

  const removeFromCart = useCallback((wandId) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', wandId });
  }, [cartDispatch]);

  const updateQuantity = useCallback((wandId, quantity) => {
    cartDispatch({ type: 'UPDATE_QUANTITY', wandId, quantity });
  }, [cartDispatch]);

  const checkout = useCallback((customerName, deliveryAddress) => {
    if (cart.length === 0) return null;
    if (cartTotal > goldBalance) return null;

    const items = cart.map(item => ({
      wand: { id: item.id, name: item.name, price: item.price, alignment: item.alignment, description: item.description },
      quantity: item.quantity,
      lineTotal: item.price * item.quantity,
    }));

    const order = {
      orderId: generateOrderId(),
      customerName,
      deliveryAddress,
      items,
      grandTotal: cartTotal,
      remainingBalance: goldBalance - cartTotal,
      timestamp: new Date().toISOString(),
      fizbanMessage: pickRandom(FIZBAN_MESSAGES),
    };

    customerDispatch({ type: 'ADD_PURCHASE', order });
    setLastOrder(order);
    cartDispatch({ type: 'CLEAR_CART' });
    return order;
  }, [cart, cartTotal, goldBalance, cartDispatch, customerDispatch, setLastOrder]);

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
      lastOrder,
      checkout,
      clearLastOrder,
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
