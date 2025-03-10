import type { JSX } from 'hono/jsx'

export const CheckIcon = (props: JSX.IntrinsicElements['div']) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' {...props}>
      <path
        d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z'
        fill='currentColor'
      />
    </svg>
  )
}
