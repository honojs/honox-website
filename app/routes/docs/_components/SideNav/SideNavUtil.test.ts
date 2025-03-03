import { getGroupedDocs } from './SideNavUtil';
import type { Frontmatter } from '../../../../global';

describe('SideNavUtil', () => {
	it('Should be GroupedDocs array generated.', () => {
		const docs: Record<string, { frontmatter?: Frontmatter }> = {
			'../../01-getting-started/01-basic.mdx': {
				frontmatter: {
					title: 'Getting Started - Basic',
					nav_title: 'Basic',
					description: null,
				},
			},
			'../../01-getting-started/02-with-client.mdx': {
				frontmatter: {
					title: 'Get Started - with Client',
					nav_title: 'with Client',
					description: null,
				},
			},
			'../../01-getting-started/byor/index.mdx': {
				frontmatter: {
					title: 'BYOR - Bring Your Own Renderer',
					nav_title: 'Bring Your Own Renderer',
					description: null,
				},
			},
			'../../01-getting-started/byor/react.mdx': {
				frontmatter: {
					title: 'React Renderer',
					nav_title: 'React',
					description: null,
				},
			},
			'../../01-getting-started/index.mdx': {
				frontmatter: {
					title: 'Getting Started',
					nav_title: 'Getting Started',
					description: 'Learn how to create a basic HonoX application.',
				},
			},
			'../../02-guide/01-nested-layouts.mdx': {
				frontmatter: {
					title: 'Nexted Layouts',
					nav_title: 'Nested Layouts',
					description: null,
				},
			},
			'../../02-guide/index.mdx': {
				frontmatter: {
					title: 'Guide',
					nav_title: 'Guide',
					description: 'Guide to create a HonoX application.',
				},
			},
		};
		const groupedDocs = getGroupedDocs(docs);
		expect(groupedDocs).toStrictEqual([
			{
				id: 'getting-started',
				frontmatter: {
					title: 'Getting Started',
					nav_title: 'Getting Started',
					description: 'Learn how to create a basic HonoX application.',
				},
				children: [
					{
						id: 'basic',
						frontmatter: {
							title: 'Getting Started - Basic',
							nav_title: 'Basic',
							description: null,
						},
						children: [],
					},
					{
						id: 'with-client',
						frontmatter: {
							title: 'Get Started - with Client',
							nav_title: 'with Client',
							description: null,
						},
						children: [],
					},
					{
						id: 'byor',
						frontmatter: {
							title: 'BYOR - Bring Your Own Renderer',
							nav_title: 'Bring Your Own Renderer',
							description: null,
						},
						children: [
							{
								id: 'react',
								frontmatter: {
									title: 'React Renderer',
									nav_title: 'React',
									description: null,
								},
								children: [],
							},
						],
					},
				],
			},
			{
				id: 'guide',
				frontmatter: {
					title: 'Guide',
					nav_title: 'Guide',
					description: 'Guide to create a HonoX application.',
				},
				children: [
					{
						id: 'nested-layouts',
						frontmatter: {
							title: 'Nexted Layouts',
							nav_title: 'Nested Layouts',
							description: null,
						},
						children: [],
					},
				],
			},
		]);
	});
});
