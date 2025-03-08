import { useRequestContext } from 'hono/jsx-renderer'
import type { Frontmatter } from '../../../../global'
import { getDocsPagination } from './DocsPaginationUtil'

export const DocsPagination = () => {
  const c = useRequestContext()

  const docs = import.meta.glob<{
    frontmatter?: Frontmatter
  }>('../../**/*.mdx', {
    eager: true,
  })

  const groupedDocs = getDocsPagination(docs, c.req.path.replace('/docs', ''))

  if (!groupedDocs) {
    return null
  }
  return (
    <nav
      className={
        'mt-8 flex items-center justify-between border-t border-gray-200 pt-8 pb-4 dark:border-gray-700'
      }
    >
      {groupedDocs.previous ? (
        <a
          href={`/docs${groupedDocs.previous.path}`}
          className={
            'max-w-1/2 text-gray-600 transition-colors hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-400'
          }
        >
          <div className={'flex flex-col items-start'}>
            <span className={'text-sm font-medium'}>Previous</span>
            <span className={'font-semibold text-gray-900 dark:text-gray-100'}>
              {groupedDocs.previous.frontmatter?.nav_title ??
                groupedDocs.previous.frontmatter?.title}
            </span>
          </div>
        </a>
      ) : (
        <div />
      )}
      {groupedDocs.next ? (
        <a
          href={`/docs${groupedDocs.next.path}`}
          class={
            'max-w-1/2 text-gray-600 transition-colors hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-400'
          }
        >
          <div className={'flex flex-col items-end'}>
            <span className={'text-sm font-medium'}>Next</span>
            <span class={'font-semibold text-gray-900 dark:text-gray-100'}>
              {groupedDocs.next.frontmatter?.nav_title ?? groupedDocs.next.frontmatter?.title}
            </span>
          </div>
        </a>
      ) : (
        <div />
      )}
    </nav>
  )
}
