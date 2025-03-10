/*
 * Original: https://fonts.google.com/icons?selected=Material+Symbols+Rounded:monitor:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=display&icon.size=24&icon.color=%231f1f1f&icon.style=Rounded
 */

import type { JSX } from 'hono/jsx'

export const ThemeSystemIcon = (props: JSX.IntrinsicElements['div']) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' {...props}>
      <path
        d='M160-240q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H680l28 28q6 6 9 13.5t3 15.5v23q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-23q0-8 3-15.5t9-13.5l28-28H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z'
        fill='currentColor'
      />
    </svg>
  )
}
