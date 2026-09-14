import type { SVGProps } from 'react'

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="khLogoMask" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="black" />
        <g transform="translate(32 32) scale(0.889) translate(-32 -31.5)">
          <circle cx="32" cy="19" r="10.5" fill="white" />
          <path
            d="M17 38C17 34.9 19.4 32.5 22.5 32.5H41.5C44.6 32.5 47 34.9 47 38V51.5C47 52.3 46.3 53 45.5 53H18.5C17.7 53 17 52.3 17 51.5V38Z"
            fill="white"
          />
          <path
            d="M15 39.4V53H11.2C10.5 53 10 52.5 10 51.8C10 47.2 11.9 42.8 15 39.4Z"
            fill="white"
          />
          <path
            d="M49 39.4V53H52.8C53.5 53 54 52.5 54 51.8C54 47.2 52.1 42.8 49 39.4Z"
            fill="white"
          />
          <g stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M28.5 37.8L23.8 42.8L28.5 47.8" />
            <path d="M35.5 37.8L40.2 42.8L35.5 47.8" />
            <path d="M34.2 37.2L29.8 48.4" />
          </g>
        </g>
      </mask>
      <rect width="64" height="64" fill="currentColor" mask="url(#khLogoMask)" />
    </svg>
  )
}
