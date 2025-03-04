/// <reference types="vitest" />
import { defineConfig } from 'vite';
import ssg from '@hono/vite-ssg';
import honox from 'honox/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const entry = './app/server.ts';

export default defineConfig({
	plugins: [
		honox(),
		ssg({ entry }),
		mdx({
			jsxImportSource: 'hono/jsx',
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
		}),
	],
	test: {
		globals: true,
		clearMocks: true,
		testTimeout: 50000,
	},
});
