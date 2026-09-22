import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PROJECTS } from '../model/projects'
import { ProjectCard } from './ProjectCard'

const project = PROJECTS[0]!

function spoken(nodes: readonly HTMLElement[]): HTMLElement[] {
  return nodes.filter((node) => node.closest('[aria-hidden="true"]') === null)
}

describe('ProjectCard', () => {
  it('renders the project as a heading linking to the project itself', () => {
    render(<ProjectCard project={project} />)

    const link = screen.getByRole('link', { name: project.title })

    expect(link).toHaveAttribute('href', project.url)
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('labels the stack list and names every technology for screen readers', () => {
    render(<ProjectCard project={project} />)

    const list = screen.getByRole('list', { name: `${project.title} stack` })

    expect(list.querySelectorAll('li')).toHaveLength(project.stack.length)
    expect(spoken(within(list).getAllByText('TypeScript'))).toHaveLength(1)
  })

  it('repeats every technology as a tooltip hidden from assistive technology', () => {
    render(<ProjectCard project={project} />)

    const list = screen.getByRole('list', { name: `${project.title} stack` })
    const named = within(list).getAllByText('TypeScript')

    expect(named).toHaveLength(2)
    expect(named.length - spoken(named).length).toBe(1)
  })
})
