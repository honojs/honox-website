import type { JSX } from 'hono/jsx'
import { useRequestContext } from 'hono/jsx-renderer'
import type { Frontmatter } from '../../../../global'
import { getGroupedDocs } from './SideNavUtil'
import type { GroupedDocs } from './SideNavUtil'

type SideNavListProps = {
  parentHref: string
  groupedDocs: GroupedDocs[]
  currentPath: string
} & JSX.IntrinsicElements['ul']

const SideNavList = ({ parentHref, groupedDocs, currentPath, ...props }: SideNavListProps) => {
  return (
    <ul class={'my-1 ml-2 font-normal text-gray-600 dark:text-gray-400'} {...props}>
      {groupedDocs.map((doc) => {
        return (
          <li key={`${parentHref}/${doc.id}`} class={'py-1'}>
            {doc.frontmatter ? (
              <a
                href={`${parentHref}/${doc.id}`}
                class={
                  'block transition-colors hover:text-gray-900 data-active:text-orange-600 dark:hover:text-gray-100 dark:data-active:text-orange-400'
                }
                data-active={currentPath === `${parentHref}/${doc.id}` ? '' : undefined}
              >
                {doc.frontmatter.nav_title ?? doc.frontmatter.title}
              </a>
            ) : (
              <span>doc.id</span>
            )}
            {doc.children.length ? (
              <SideNavList
                parentHref={`${parentHref}/${doc.id}`}
                groupedDocs={doc.children}
                class={'my-1 ml-4 font-normal text-gray-600 dark:text-gray-400'}
                currentPath={currentPath}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

type SideNavProps = JSX.IntrinsicElements['nav']

export const SideNav = (props: SideNavProps) => {
  const c = useRequestContext()

  const docs = import.meta.glob<{
    frontmatter?: Frontmatter
  }>('../../**/*.mdx', {
    eager: true,
  })

  const groupedDocs = getGroupedDocs(docs)

  return (
    <nav class={'sticky top-28 h-[calc(100vh-112px)] w-[200px] shrink-0'} {...props}>
      <ul class={'text-sm font-semibold text-gray-900 dark:text-gray-200'}>
        {groupedDocs.map((doc) => (
          <li key={doc.id} class={'pb-2'}>
            {doc.frontmatter ? (
              <a
                href={`/docs/${doc.id}`}
                class={
                  'block transition-colors data-active:text-orange-600 dark:data-active:text-orange-400'
                }
                data-active={c.req.path === `/docs/${doc.id}` ? '' : undefined}
              >
                {doc.frontmatter.nav_title ?? doc.frontmatter.title}
              </a>
            ) : (
              <span>{doc.id}</span>
            )}
            <SideNavList
              parentHref={`/docs/${doc.id}`}
              groupedDocs={doc.children}
              currentPath={c.req.path}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
