import { useState, useEffect } from "react";

/**
 * Custom Hook: useDebounce
 * Delays updating a value until after the specified delay has elapsed.
 * Useful for optimizing search inputs.
 *
 * @param {any} value - Value to debounce
 * @param {number} delayMs - Delay in milliseconds
 * @returns {any} debouncedValue
 */
export function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
