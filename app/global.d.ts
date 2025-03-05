import {} from 'hono'

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
      meta?: { frontmatter?: Frontmatter }
    ): Response | Promise<Response>
  }
}

declare module '*.mdx' {
  export const frontmatter: Frontmatter
}
