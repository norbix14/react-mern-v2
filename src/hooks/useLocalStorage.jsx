import { useState } from 'react'

/**
 * Custom hook to store a `key=value` pair in `localStorage`.
 *
 * @param {string} key - key to be stored in `localStorage`.
 * @param {any} initialValue - initial value for the `key`.
 *
 * @example
 * const [value, setValue] = useLocalStorage('key', 'initialValue')
 * const { 0: value, 1: setValue } = useLocalStorage('key', 'initialValue')
 *
 * @returns {[any, function]} a tuple with the current value and a function to set the value.
 */
export default function useLocalStorage(key, initialValue) {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue]
}
