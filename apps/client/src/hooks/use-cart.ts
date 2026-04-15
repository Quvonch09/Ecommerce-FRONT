import { useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from '../types';
import { storage } from '../utils/storage';

const loadInitialCart = (): CartItem[] => {
  const raw = storage.getCart();
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);

  useEffect(() => {
    storage.setCart(JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          quantity: 1,
          product,
        },
      ];
    });
  };

  const removeItem = (productId: Product['id']) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: Product['id'], quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    storage.clearCart();
  };

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  return {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};
