import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'

const pages = import.meta.glob(
  [
    '/app/routes/**/!(_*|$*|*.test|*.spec).(ts|tsx|md|mdx)',
    '/app/routes/.well-known/**/!(_*|$*|*.test|*.spec).(ts|tsx|md|mdx)',
  ],
  {
    eager: true,
  }
)

/**
 * Rename routes to remove the numbering from the path.
 * Example:
 * - /examples/1-basic.tsx -> /examples/basic
 * - /docs/01-getting-started/01-basic.mdx -> /docs/getting-started/basic
 */
const renamedRoutes = Object.assign(
  {},
  ...Object.entries(pages).map(([path, page]) => {
    const newPath = path.replace(/\/\d+-/g, '/')
    return { [newPath]: page }
  })
)

const app = createApp({
  ROUTES: renamedRoutes,
})

showRoutes(app)

export default app
