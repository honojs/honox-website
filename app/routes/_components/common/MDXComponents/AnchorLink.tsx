import { twMerge } from 'tailwind-merge'

type AnchorLinkProps = {
  anchorId?: string | null
  anchorTitle?: string | null
  className?: string
}

export const AnchorLink = ({ anchorId, anchorTitle, className }: AnchorLinkProps) => {
  if (!anchorId || !anchorTitle) {
    return null
  }
  return (
    <a
      href={`#${anchorId}`}
      aria-label={`Permalink to ${anchorTitle}`}
      className={twMerge(
        'absolute bottom-0 left-0 mr-0.5 -ml-[0.75em] w-1 translate-y-[0.05em] pr-0.5 font-semibold text-orange-600 opacity-0 transition-opacity select-none group-hover:opacity-100 dark:text-orange-400',
        className
      )}
    >
      #
    </a>
  )
}
