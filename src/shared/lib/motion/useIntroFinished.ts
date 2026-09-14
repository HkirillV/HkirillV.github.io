import { useEffect, useState } from 'react'

const INTRO_ELEMENT_ID = 'preloader'

export function useIntroFinished(): boolean {
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (!document.getElementById(INTRO_ELEMENT_ID)) {
      setIsFinished(true)
      return
    }

    if (typeof MutationObserver === 'undefined') {
      setIsFinished(true)
      return
    }

    const observer = new MutationObserver(() => {
      if (document.getElementById(INTRO_ELEMENT_ID)) return

      setIsFinished(true)
      observer.disconnect()
    })

    observer.observe(document.body, { childList: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return isFinished
}
