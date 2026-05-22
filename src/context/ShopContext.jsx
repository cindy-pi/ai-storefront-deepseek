import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY_CART = 'fizbans_cart';
const STORAGE_KEY_BALANCE = 'fizbans_balance';
const STORAGE_KEY_HISTORY = 'fizbans_history';
const STARTING_BALANCE = 1000;

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => loadJSON(STORAGE_KEY_CART, []));
  const [goldBalance, setGoldBalance] = useState(() => loadJSON(STORAGE_KEY_BALANCE, STARTING_BALANCE));
  const [purchaseHistory, setPurchaseHistory] = useState(() => loadJSON(STORAGE_KEY_HISTORY, []));

  useEffect(() => { localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_BALANCE, JSON.stringify(goldBalance)); }, [goldBalance]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(purchaseHistory)); }, [purchaseHistory]);

  const addToCart = useCallback((wand) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === wand.id);
      if (existing) {
        return prev.map(item =>
          item.id === wand.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...wand, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((wandId) => {
    setCart(prev => prev.filter(item => item.id !== wandId));
  }, []);

  const updateQuantity = useCallback((wandId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(wandId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === wandId ? { ...item, quantity } : item
    ));
  }, [removeFromCart]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = useCallback(() => {
    if (cart.length === 0) return null;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (total > goldBalance) return null;

    const order = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: new Date().toISOString(),
      items: [...cart],
      total,
      remainingBalance: goldBalance - total,
    };

    setGoldBalance(prev => prev - total);
    setPurchaseHistory(prev => [order, ...prev]);
    setCart([]);
    return order;
  }, [cart, goldBalance]);

  return (
    <ShopContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
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
