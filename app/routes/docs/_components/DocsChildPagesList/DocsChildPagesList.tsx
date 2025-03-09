import { useRequestContext } from 'hono/jsx-renderer'
import type { Frontmatter } from '../../../../global'
import { getDocsPagination } from '../DocsPagination/DocsPaginationUtil'
import { getDocsChildPages } from './DocsChildPagesListUtil'

export const DocsChildPagesList = () => {
  const c = useRequestContext()

  const docs = import.meta.glob<{
    frontmatter?: Frontmatter
  }>('../../**/*.mdx', {
    eager: true,
  })

  const childDocs = getDocsChildPages(docs, c.req.path.replace('/docs', ''))

  if (childDocs.length === 0) {
    return null
  }
  return (
    <div className='my-12 grid grid-cols-2 gap-6'>
      {childDocs.map((docs) => {
        if (!docs.frontmatter) {
          return null
        }
        return (
          <a
            href={`/docs${docs.path}`}
            className={
              'rounded-md border border-gray-300 p-4 text-lg text-gray-900 transition-colors hover:text-orange-700 dark:border-gray-700 dark:text-gray-100 dark:hover:text-orange-400'
            }
          >
            <p className={'font-semibold'}>
              {docs.frontmatter?.nav_title || docs.frontmatter?.title}
            </p>
            {docs.frontmatter?.description ? (
              <p class={'mt-2 text-sm text-gray-600 dark:text-gray-400'}>
                {docs.frontmatter?.description}
              </p>
            ) : null}
          </a>
        )
      })}
    </div>
  )
}
