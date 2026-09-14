import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from './ErrorBoundary'

function Exploding(): never {
  throw new Error('render failed')
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ErrorBoundary', () => {
  it('renders its children while nothing goes wrong', () => {
    render(
      <ErrorBoundary>
        <p>content</p>
      </ErrorBoundary>,
    )

    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('swallows a failing subtree instead of taking the page down', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const { container } = render(
      <ErrorBoundary>
        <Exploding />
      </ErrorBoundary>,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('shows the fallback when one is given', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <ErrorBoundary fallback={<p>unavailable</p>}>
        <Exploding />
      </ErrorBoundary>,
    )

    expect(screen.getByText('unavailable')).toBeInTheDocument()
  })
})
