import type { Toc } from '@stefanprobst/rehype-extract-toc'
import type { JSX } from 'hono/jsx'
import { TableOfContents } from './$TableOfContents'

type DocsNavProps = {
  tableOfContents?: Toc
} & JSX.IntrinsicElements['nav']

export const DocsNav = ({ tableOfContents, ...props }: DocsNavProps) => {
  return (
    <nav className={'sticky top-28 h-[calc(100vh-112px)] w-[200px] shrink-0'} {...props}>
      {tableOfContents ? (
        <div className={'text-sm text-gray-900 dark:text-gray-200'}>
          <div className={'font-semibold'}>On this page</div>
          {tableOfContents ? <TableOfContents tableOfContents={tableOfContents} /> : null}
        </div>
      ) : null}
    </nav>
  )
}
