const pending = new WeakMap<Element, AbortController>()

export function replayAnimation(node: Element, className: string | undefined): void {
  if (!className) return

  const active = className

  pending.get(node)?.abort()

  const controller = new AbortController()

  pending.set(node, controller)

  function finish(): void {
    if (controller.signal.aborted) return

    controller.abort()
    pending.delete(node)
    node.classList.remove(active)
  }

  node.classList.remove(active)
  void node.getBoundingClientRect()
  node.classList.add(active)

  let hasStarted = false

  node.addEventListener(
    'animationstart',
    () => {
      hasStarted = true
    },
    { signal: controller.signal },
  )
  node.addEventListener('animationend', finish, { signal: controller.signal })

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!hasStarted) finish()
    })
  })
}
