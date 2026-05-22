import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'fizban_customer';
const STARTING_BALANCE = 1000;

function loadCustomer() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { goldBalance: STARTING_BALANCE, purchaseHistory: [] };
}

function customerReducer(state, action) {
  switch (action.type) {
    case 'DEDUCT_GOLD': {
      const newBalance = Math.max(0, state.goldBalance - action.amount);
      return { ...state, goldBalance: newBalance };
    }
    case 'ADD_PURCHASE': {
      const newBalance = Math.max(0, state.goldBalance - action.order.total);
      return {
        ...state,
        goldBalance: newBalance,
        purchaseHistory: [action.order, ...state.purchaseHistory],
      };
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

  return (
    <CustomerContext.Provider value={{ ...customer, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error('useCustomer must be used within CustomerProvider');
  return ctx;
}
