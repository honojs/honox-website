import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const ghAlertRe = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]/i

export const remarkMDXGitHubBlockquoteAlert: Plugin = () => {
  return (tree) => {
    visit(
      tree,
      (node) => {
        return node.type === 'blockquote' && 'children' in node && Array.isArray(node.children)
      },
      (node) => {
        if (
          'children' in node &&
          Array.isArray(node.children) &&
          node.children.length > 0 &&
          node.children[0].type === 'paragraph' &&
          'children' in node.children[0] &&
          Array.isArray(node.children[0].children) &&
          node.children[0].children.length > 0 &&
          node.children[0].children[0].type === 'text'
        ) {
          if (ghAlertRe.test(node.children[0].children[0].value)) {
            node.data = {
              hName: 'alertannotation',
              hProperties: {
                type: ghAlertRe.exec(node.children[0].children[0].value)![1],
              },
            }
            node.children[0].children[0].value = node.children[0].children[0].value.replace(
              /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]\r\n|\r|\n/,
              ''
            )
          }
        }
      }
    )
  }
}
