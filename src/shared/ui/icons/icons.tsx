import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = { 'aria-hidden': true, focusable: false } as const

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="none">
      <mask id="moonCrescent" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <circle cx="13.32" cy="10.88" r="9" fill="white" />
        <circle cx="18.72" cy="6.28" r="8.6" fill="black" />
      </mask>
      <rect width="24" height="24" fill="currentColor" mask="url(#moonCrescent)" />
    </svg>
  )
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.9 4.3 18.9 19c-.2 1-.8 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.7-7.9c.4-.3-.1-.5-.6-.2L6.9 12.9 2.3 11.4c-1-.3-1-1 .2-1.5l18-7c.8-.3 1.6.2 1.4 1.4Z" />
    </svg>
  )
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5ZM3 8.98h4v12H3ZM9.5 8.98h3.83v1.64h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12v6.32h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-4Z" />
    </svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
    </svg>
  )
}

export function ZoomInIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M21 21l-5.2-5.2M10.5 7.5v6M7.5 10.5h6" strokeLinecap="round" />
    </svg>
  )
}

export function ZoomOutIcon(props: IconProps) {
  return (
    <svg {...base} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M21 21l-5.2-5.2M7.5 10.5h6" strokeLinecap="round" />
    </svg>
  )
}
