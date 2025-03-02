import {} from 'hono';

type Frontmatter = {
	title: string;
	navLabel?: string;
	publishedAt: string;
	emoji: string;
	color: string;
};

declare module 'hono' {
	interface Env {}

	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: <explanation>
		(
			content: string | Promise<string>,
			meta?: { frontmatter?: Frontmatter },
		): Response | Promise<Response>;
	}
}

declare module '*.mdx' {
	export const frontmatter: Frontmatter;
}
