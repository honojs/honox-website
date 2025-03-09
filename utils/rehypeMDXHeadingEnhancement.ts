import { headingRank } from 'hast-util-heading-rank'
import { toString } from 'hast-util-to-string'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const rehypeMDXHeadingEnhancement: Plugin = () => {
  return (tree) => {
    visit(
      tree,
      (node) => {
        return node.type === 'element'
      },
      (node) => {
        // @ts-expect-error: `headingRank` required hast node
        const level = headingRank(node)
        if (!level) {
          return
        }

        if (!('properties' in node) || !node.properties) {
          node = {
            ...node,
            // @ts-expect-error: node.properties exists in element node
            properties: {},
          }
        }

        // @ts-expect-error: `toString` required hast node
        const nodeString = toString(node)

        const id =
          // @ts-expect-error: node.properties exists in element node
          node?.properties?.id ||
          nodeString
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/ /g, '-')

        // @ts-expect-error: node.properties exists in element node
        node.properties = {
          // @ts-expect-error: node.properties exists in element node
          ...node?.properties,
          title: nodeString,
          id: id,
        }
      }
    )
  }
}
