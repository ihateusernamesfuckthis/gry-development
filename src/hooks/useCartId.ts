import { useState, useEffect } from "react";
import { SESSION_KEYS } from "@/constants";

/**
 * Custom hook for managing cart ID in localStorage
 * @returns Object with cartId and setCartId function
 */
export function useCartId() {
  const [cartId, setCartIdState] = useState<string | null>(null);

  useEffect(() => {
    const storedCartId = localStorage.getItem(SESSION_KEYS.CART_ID);
    setCartIdState(storedCartId);
  }, []);

  const setCartId = (id: string) => {
    localStorage.setItem(SESSION_KEYS.CART_ID, id);
    setCartIdState(id);
  };

  return { cartId, setCartId };
}
