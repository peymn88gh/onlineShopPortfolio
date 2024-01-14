import { createContext, useReducer } from 'react';

export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null);
const initialCart = [
    // {
    //     id:1,
    //     name : 'test',
    //     count : 0
    // },
  ];
export function CartProvider({ children }) {
    const [cartContent, dispatch] = useReducer(cartReducer, initialCart);
    
    return (
      <CartContext.Provider value={cartContent}>
        <CartDispatchContext.Provider value={dispatch}>
          {children}
        </CartDispatchContext.Provider>
      </CartContext.Provider>
    );
}
function cartReducer(items, action) {
    switch (action.type) {
      case 'added':
        // Find the item with the same ID in the cart
        console.log(action);
        const existingItem = items.find(item => item.id === action.payload.id);
  
        if (existingItem) {
          // If it exists, increase the count
          return items.map(item =>
            item.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item
          );
        } else {
          // If it doesn't exist, add the new item to the cart
          return [...items, action.payload];
        }
  
      case 'minus':
        return items.map(item =>
          item.id === action.payload.id
            ? { ...item, count: action.payload.count - 1 }
            : item
        );
  
      case 'deleted':
        // Remove the item with the specified ID from the cart
        return items.filter(item => item.id !== action.payload.id);
  
      default:
        throw new Error('Unknown action: ' + action.type);
    }
  }
