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
        <main class={'relative mx-auto my-12 flex max-w-[1300px] flex-row gap-8 px-8'}>
          <SideNav />
          <article>
            {frontmatter ? <h1>{frontmatter.title}</h1> : null}
            {children}
          </article>
        </main>
      </body>
    </html>
  )
})
