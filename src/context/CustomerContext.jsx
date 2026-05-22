import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'fizban_customer';
const STARTING_BALANCE = 1000;

function loadCustomer() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { goldBalance: STARTING_BALANCE, purchaseHistory: [], lastOrder: null };
}

function customerReducer(state, action) {
  switch (action.type) {
    case 'DEDUCT_GOLD': {
      const newBalance = Math.max(0, state.goldBalance - action.amount);
      return { ...state, goldBalance: newBalance };
    }
    case 'ADD_PURCHASE': {
      const amount = action.order.grandTotal ?? action.order.total;
      const newBalance = Math.max(0, state.goldBalance - amount);
      return {
        ...state,
        goldBalance: newBalance,
        purchaseHistory: [action.order, ...state.purchaseHistory],
      };
    }
    case 'SET_LAST_ORDER': {
      return { ...state, lastOrder: action.order };
    }
    case 'CLEAR_LAST_ORDER': {
      return { ...state, lastOrder: null };
    }
    default:
      return state;
  }
}

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const [customer, dispatch] = useReducer(customerReducer, null, loadCustomer);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
  }, [customer]);

  const setLastOrder = useCallback((order) => {
    dispatch({ type: 'SET_LAST_ORDER', order });
  }, []);

  const clearLastOrder = useCallback(() => {
    dispatch({ type: 'CLEAR_LAST_ORDER' });
  }, []);

  return (
    <CustomerContext.Provider value={{ ...customer, dispatch, setLastOrder, clearLastOrder }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error('useCustomer must be used within CustomerProvider');
  return ctx;
}
