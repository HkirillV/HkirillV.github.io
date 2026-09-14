import { useEffect, useState } from 'react'

import { rafThrottle } from '../dom/rafThrottle'

export function useScrolledPast(threshold: number): boolean {
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    const onScroll = rafThrottle(() => {
      setIsPast(window.scrollY > threshold)
    })

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      onScroll.cancel()
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return isPast
}
