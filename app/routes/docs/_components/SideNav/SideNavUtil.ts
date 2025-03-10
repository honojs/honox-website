import type { Frontmatter } from '../../../../global'

export type GroupedDocs = {
  id: string
  frontmatter?: Frontmatter
  children: GroupedDocs[]
}

type TempPathMap = {
  [key: string]: {
    id: string
    frontmatter?: Frontmatter
    children: TempPathMap
  }
}

export function getGroupedDocs(docs: Record<string, { frontmatter?: Frontmatter }>): GroupedDocs[] {
  const tempPathMap: TempPathMap = {}
  for (const [path, value] of Object.entries(docs)) {
    const parts = path
      .replace(/\.\.\//g, '')
      .replace(/\.\//g, '')
      .split('/')
      .filter(Boolean)

    function buildPathMap(currentParts: string[], currentPathMap: TempPathMap) {
      const currentPart = currentParts[0]
      const nextPart = currentParts[1]

      if (nextPart === 'index.mdx') {
        if (!currentPathMap[currentPart]) {
          currentPathMap[currentPart] = {
            id: currentPart,
            frontmatter: value.frontmatter,
            children: {},
          }
          return
        }
        currentPathMap[currentPart].frontmatter = value.frontmatter
        return
      }
      if (!currentPathMap[currentPart]) {
        currentPathMap[currentPart] = {
          id: currentPart,
          frontmatter: undefined,
          children: {},
        }
      }
      if (!nextPart) {
        currentPathMap[currentPart].frontmatter = value.frontmatter
        return
      }
      buildPathMap(currentParts.slice(1), currentPathMap[currentPart].children)
    }

    if (value.frontmatter && !value.frontmatter.exclude_from_nav) {
      buildPathMap(parts, tempPathMap)
    }
  }

  function buildResult(pathMap: TempPathMap): GroupedDocs[] {
    const currentResult = []
    const orderedKeys = Object.keys(pathMap).sort((a, b) => a.localeCompare(b))
    for (const key of orderedKeys) {
      const value = {
        id: key.replace(/\.mdx$/, '').replace(/^\d+-/, ''),
        frontmatter: pathMap[key].frontmatter,
        children: buildResult(pathMap[key].children),
      }
      currentResult.push(value)
    }
    return currentResult
  }

  return buildResult(tempPathMap)
}
