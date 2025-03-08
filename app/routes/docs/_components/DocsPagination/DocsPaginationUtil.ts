import type { Frontmatter } from '../../../../global'

export type Docs = {
  path: string
  frontmatter?: Frontmatter
}

export function getDocsPagination(
  docs: Record<string, { frontmatter?: Frontmatter }>,
  currentPathName: string
): {
  previous: Docs | null
  next: Docs | null
} | null {
  const allResult = Object.entries(docs)
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
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({
      path: key.replace(/\/\d+-/g, '/'),
      frontmatter: value.frontmatter,
    }))

  const currentPathIndex = allResult.findIndex((doc) => doc.path === currentPathName)

  if (currentPathIndex === -1) {
    return null
  }

  if (currentPathIndex === 0) {
    return {
      previous: allResult[allResult.length - 1],
      next: allResult[currentPathIndex + 1] || null,
    }
  }

  if (currentPathIndex === allResult.length - 1) {
    return {
      previous: allResult[currentPathIndex - 1],
      next: allResult[0],
    }
  }

  return {
    previous: allResult[currentPathIndex - 1],
    next: allResult[currentPathIndex + 1],
  }
}
