/// <reference types="vitest" />
import { defineConfig } from 'vite';
import ssg from '@hono/vite-ssg';
import honox from 'honox/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeShiki from '@shikijs/rehype';
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';

const entry = './app/server.ts';

export default defineConfig({
	plugins: [
		honox(),
		ssg({ entry }),
		mdx({
			jsxImportSource: 'hono/jsx',
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [
				[rehypeShiki, {
					themes: {
						light: 'vitesse-light',
						dark: 'vitesse-dark',
					},
					transformers: [
						transformerTwoslash({
							renderer: rendererRich()
						}),
					],
				}]
			]
		}),
	],
	test: {
		globals: true,
		clearMocks: true,
		testTimeout: 50000,
	},
});
