import { atom } from "recoil";

// Helper to read from localStorage
const readFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
};

// Define the atom
export const isLoggedInState = atom({
  key: "isLoggedInState", // Unique ID
  default: readFromLocalStorage("isLoggedIn", false), // Load initial state from localStorage
  effects: [
    ({ onSet }) => {
      // Write to localStorage whenever state changes
      onSet((newValue) => {
        localStorage.setItem("isLoggedIn", JSON.stringify(newValue));
      });
    },
  ],
});