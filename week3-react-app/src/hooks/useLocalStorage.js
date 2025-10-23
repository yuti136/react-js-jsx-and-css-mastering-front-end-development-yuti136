import { useState, useEffect } from "react";

/**
 * Custom hook for managing any state with localStorage persistence
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (err) {
      console.error("Error loading from localStorage", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error("Error saving to localStorage", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
