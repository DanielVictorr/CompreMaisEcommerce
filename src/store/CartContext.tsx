import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types';
import { stat } from 'fs';

type CartItem = Product & { quantity: number };

type State = { items: CartItem[] };
type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; product: Product }
  | { type: 'REMOVE-ALL'; id: number }
  | { type: 'CLEAR' }
  | { type: 'SET_FROM_STORAGE'; items: CartItem[] };

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.product.id);
      if (exists) {
        return { items: state.items.map(i => i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] };
    }
    case 'REMOVE':{
      const exists = state.items.find(i => i.id === action.product.id);
      if (exists) {
        return { items: state.items.map(i => i.id === action.product.id ? { ...i, quantity: (i.quantity === 0 ? 0 : i.quantity - 1)  } : i) };
      }
      return { items: [...state.items, { ...action.product, quantity: 0 }] };
    }
    case "REMOVE-ALL":
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    case 'SET_FROM_STORAGE':
      return { items: action.items };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = localStorage.getItem('cart_v1');
    if (raw) dispatch({ type: 'SET_FROM_STORAGE', items: JSON.parse(raw) });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(state.items));
  }, [state.items]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
