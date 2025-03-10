import {} from 'hono'
import type { Toc } from '@stefanprobst/rehype-extract-toc'

type Frontmatter = {
  title: string
  nav_title?: string | null
  description?: string | null
  exclude_from_nav?: boolean | null
}

declare module 'hono' {
  interface Env {}

  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: <explanation>
    (
      content: string | Promise<string>,
      meta?: { frontmatter?: Frontmatter; tableOfContents?: Toc }
    ): Response | Promise<Response>
  }
}

declare module '*.mdx' {
  export const frontmatter: Frontmatter
  export const tableOfContents: Toc
}
