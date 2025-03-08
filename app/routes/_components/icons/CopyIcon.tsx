import type { JSX } from 'hono/jsx'

export const CopyIcon = (props: JSX.IntrinsicElements['div']) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' {...props}>
      <path
        d='M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z'
        fill='currentColor'
      />
    </svg>
  )
}
