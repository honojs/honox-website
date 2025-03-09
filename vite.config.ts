/// <reference types="vitest" />
import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup'
import rehypeExtractToC from '@stefanprobst/rehype-extract-toc'
import rehypeExtractToCExport from '@stefanprobst/rehype-extract-toc/mdx'
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import { rehypeMDXCodeMeta } from './utils/rehypeMDXCodeMeta'
import { rehypeMDXHeadingEnhancement } from './utils/rehypeMDXHeadingEnhancement'
import { remarkMDXGitHubBlockquoteAlert } from './utils/remarkMDXGitHubBlockquoteAlert'

const entry = './app/server.ts'

export default defineConfig({
  plugins: [
    honox(),
    ssg({ entry }),
    mdx({
      jsxImportSource: 'hono/jsx',
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        remarkMDXGitHubBlockquoteAlert,
      ],
      rehypePlugins: [
        rehypeMDXCodeMeta,
        rehypeMDXHeadingEnhancement,
        rehypeExtractToC,
        rehypeExtractToCExport,
      ],
      elementAttributeNameCase: 'react',
      providerImportSource: '/app/routes/_components/common/MDXComponents/MDXComponents.tsx',
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    clearMocks: true,
    testTimeout: 50000,
  },
})
