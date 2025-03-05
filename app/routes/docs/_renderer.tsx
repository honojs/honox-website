import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'
import { Header } from '../_components/common/Header/Header'
import { SideNav } from './_components/SideNav/SideNav'

export default jsxRenderer(({ children, frontmatter }) => {
  return (
    <html
      lang='en'
      class={'bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100'}
    >
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {frontmatter ? (
          <>
            <title>{frontmatter.title}</title>
            {frontmatter.description ? (
              <meta name='description' content={frontmatter.description} />
            ) : null}
          </>
        ) : null}
        <Link rel='stylesheet' href='/app/style.css' />
      </head>
      <body>
        <Header />
        <main class={'flex gap-8'}>
          <SideNav />
          <div>
            {frontmatter ? <h1>{frontmatter.title}</h1> : null}
            {children}
          </div>
        </main>
      </body>
    </html>
  )
})
