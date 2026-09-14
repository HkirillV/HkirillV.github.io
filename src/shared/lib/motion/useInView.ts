import { useEffect, useRef, useState, type RefObject } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element>({
  threshold = 0.08,
  rootMargin = '0px 0px -6% 0px',
  once = true,
}: Options = {}): { ref: RefObject<T | null>; isInView: boolean } {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting)

        if (isVisible) {
          setIsInView(true)

          if (once) observer.disconnect()

          return
        }

        if (!once) setIsInView(false)
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once])

  return { ref, isInView }
}
