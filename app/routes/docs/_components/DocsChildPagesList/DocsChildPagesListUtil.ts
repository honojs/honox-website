import type { Frontmatter } from '../../../../global'

export type Docs = {
  path: string
  frontmatter?: Frontmatter
}

export const getDocsChildPages = (
  docs: Record<string, { frontmatter?: Frontmatter }>,
  currentPathName: string
): Docs[] => {
  const childrenResult = Object.entries(docs)
    .map(([key, value]): [string, { frontmatter?: Frontmatter }] => {
      return [
        `/${key
          .replace(/\.\.\//g, '')
          .replace(/\.\//g, '')
          .replace(/index.mdx$/, '')
          .replace(/\.mdx$/, '')
          .replace(/\/$/, '')}`,
        value,
      ]
    })
    .filter(([key]) => {
      return (
        key.replace(/\/\d+-/g, '/').startsWith(currentPathName) &&
        key
          .replace(/\/\d+-/g, '/')
          .replace(currentPathName, '')
          .split('/').length == 2
      )
    })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({
      path: key.replace(/\/\d+-/g, '/'),
      frontmatter: value.frontmatter,
    }))

  return childrenResult
}
