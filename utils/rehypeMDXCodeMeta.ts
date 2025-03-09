import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const parseMetaStringToObject = (meta?: unknown) => {
  const metaObject: {
    [key: string]: string | true
  } = {}
  if (!meta || typeof meta !== 'string') {
    return metaObject
  }
  const regex = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g
  let match

  while ((match = regex.exec(meta)) !== null) {
    metaObject[match[1]] =
      !match[2] && !match[3] && !match[4] ? true : match[2] || match[3] || match[4]
  }

  return metaObject
}
export const rehypeMDXCodeMeta: Plugin = () => {
  return (tree) => {
    visit(
      tree,
      (node) => {
        if (node.type !== 'element') {
          return false
        }
        if (
          'tagName' in node &&
          node.tagName === 'pre' &&
          'children' in node &&
          Array.isArray(node.children) &&
          node.children.length > 0
        ) {
          const code = node.children[0]
          if (code.type === 'element' && code.tagName === 'code') {
            return true
          }
        }
        return false
      },
      (node) => {
        if (
          'tagName' in node &&
          'properties' in node &&
          'children' in node &&
          Array.isArray(node.children) &&
          node.children.length > 0
        ) {
          const code = node.children[0]
          const className = Array.isArray(code.properties.className)
            ? code.properties.className
            : (code.properties.className = [])
          const lang = className.find((cn: unknown): cn is string =>
            String(cn).startsWith('language-')
          )

          const codeProperties = {
            ...code.properties,
            language: lang ? String(lang).slice(9) : null,
            ...parseMetaStringToObject(code?.data?.meta),
          }

          node.tagName = 'codeblock'
          node.children = code.children
          node.properties = codeProperties
        }
      }
    )
  }
}
