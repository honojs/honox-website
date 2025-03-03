import { jsxRenderer } from 'hono/jsx-renderer';
import { SideNav } from './_components/SideNav/SideNav';

export default jsxRenderer(({ children, frontmatter }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{frontmatter ? (
					<>
						<title>{frontmatter.title}</title>
						{frontmatter.description ? (
							<meta name="description" content={frontmatter.description} />
						) : null}
					</>
				) : null}
			</head>
			<body style={'display:flex;gap:2rem;'}>
				<SideNav />
				<div>
					{frontmatter ? <h1>{frontmatter.title}</h1> : null}
					{children}
				</div>
			</body>
		</html>
	);
});
