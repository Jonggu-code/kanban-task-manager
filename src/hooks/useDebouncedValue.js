import { useEffect, useState } from 'react'

export const useDebouncedValue = (value, delayMs = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => clearTimeout(timerId)
  }, [value, delayMs])

  return debouncedValue
}
