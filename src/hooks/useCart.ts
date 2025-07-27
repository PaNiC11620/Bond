import { useState, useEffect } from 'react';
import { CartItem, Cart } from '../types/cart';

const CART_STORAGE_KEY = 'bond_coffee_cart';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  });

  // Завантажуємо корзину з localStorage при ініціалізації
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Помилка завантаження корзини:', error);
      }
    }
  }, []);

  // Зберігаємо корзину в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return { totalItems, totalPrice };
  };

  const addToCart = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const itemId = `${item.coffeeId}-${item.packageSize}`;
    const totalPrice = item.pricePerItem * item.quantity;
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        cartItem => cartItem.id === itemId
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Якщо товар вже є в корзині, збільшуємо кількість
        newItems = prevCart.items.map((cartItem, index) => {
          if (index === existingItemIndex) {
            const newQuantity = cartItem.quantity + item.quantity;
            return {
              ...cartItem,
              quantity: newQuantity,
              totalPrice: cartItem.pricePerItem * newQuantity
            };
          }
          return cartItem;
        });
      } else {
        // Додаємо новий товар
        newItems = [
          ...prevCart.items,
          {
            ...item,
            id: itemId,
            totalPrice
          }
        ];
      }

      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals
      };
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.pricePerItem * newQuantity
          };
        }
        return item;
      });

      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0
    });
  };

  const getItemQuantity = (coffeeId: number, packageSize: string) => {
    const itemId = `${coffeeId}-${packageSize}`;
    const item = cart.items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  };
};