/// <reference types="vitest" />
import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import { rehypeMDXCodeMeta } from './utils/rehypeMDXCodeMeta'
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
      rehypePlugins: [rehypeMDXCodeMeta],
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
