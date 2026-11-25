import { useState, useEffect } from "react";
import { getItem, setItem } from "../services/storage";

/**
 * Custom Hook: useLocalStorage
 * Synchronizes state with browser LocalStorage.
 *
 * @param {string} key - LocalStorage key name
 * @param {any} initialValue - Default state value if key doesn't exist
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return getItem(key, initialValue);
  });

  useEffect(() => {
    setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
