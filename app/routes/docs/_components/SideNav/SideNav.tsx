import type { Frontmatter } from '../../../../global'
import { getGroupedDocs } from './SideNavUtil'
import type { GroupedDocs } from './SideNavUtil'

type SideNavListProps = {
  parentHref: string
  groupedDocs: GroupedDocs[]
}

const SideNavList = ({ parentHref, groupedDocs }: SideNavListProps) => {
  return (
    <ul style={'padding-left:25px;'}>
      {groupedDocs.map((doc) => {
        return (
          <li key={`${parentHref}/${doc.id}`}>
            {doc.frontmatter ? (
              <a href={`${parentHref}/${doc.id}`}>
                {doc.frontmatter.nav_title ?? doc.frontmatter.title}
              </a>
            ) : (
              <span>doc.id</span>
            )}
            {doc.children.length ? (
              <SideNavList parentHref={`${parentHref}/${doc.id}`} groupedDocs={doc.children} />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export const SideNav = () => {
  const docs = import.meta.glob<{
    frontmatter?: Frontmatter
  }>('../../**/*.mdx', {
    eager: true,
  })

  const groupedDocs = getGroupedDocs(docs)

  return (
    <div>
      <SideNavList parentHref={'/docs'} groupedDocs={groupedDocs} />
    </div>
  )
}
