import { useRequestContext } from 'hono/jsx-renderer'
import { ExternalLinkIcon } from '../../icons/ExternalLinkIcon'

type HeaderLinkProps = {
  href: string
  children: string
  isExternal?: boolean
}

export const HeaderLink = ({ href, children, isExternal }: HeaderLinkProps) => {
  const { req } = useRequestContext()

  return (
    <a
      class={
        'text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 data-active:text-orange-600 dark:text-gray-400 dark:hover:text-gray-100 dark:data-active:text-orange-400'
      }
      href={href}
      data-active={req.path.startsWith(href) ? '' : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
      {isExternal ? (
        <ExternalLinkIcon className={'ml-0.5 inline-block size-3 opacity-50'} aria-hidden />
      ) : null}
    </a>
  )
}
