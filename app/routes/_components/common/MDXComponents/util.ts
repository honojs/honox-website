import type { JSXNode } from 'hono/jsx'

export const getAnchorId = (children: string | JSXNode): string | null => {
  // Anchor only supported when string only in heading
  if (typeof children === 'string') {
    return children
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/ /g, '-')
  }
  return null
}

export const getAnchorTitle = (children: string | JSXNode): string | null => {
  // Anchor only supported when string only in heading
  if (typeof children === 'string') {
    return children
  }
  return null
}
