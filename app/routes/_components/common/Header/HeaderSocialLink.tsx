import type { Child } from 'hono/jsx'

type HeaderSocialLink = {
  href: string
  icon: Child
}

export const HeaderSocialLink = ({ icon, href }: HeaderSocialLink) => {
  return (
    <a
      href={href}
      rel={'noopener noreferrer'}
      target={'_blank'}
      class='size-4.5 text-gray-800 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
    >
      {icon}
    </a>
  )
}
