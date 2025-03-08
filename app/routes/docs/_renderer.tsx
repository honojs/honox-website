import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'
import { Header } from '../_components/common/Header/Header'
import { SideNav } from './_components/SideNav/SideNav'

export default jsxRenderer(({ children, frontmatter }) => {
  return (
    <html
      lang='en'
      class={'scroll-pt-22 bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100'}
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
        <main class={'relative mx-auto my-12 flex w-full max-w-[1300px] flex-row gap-8 px-8'}>
          <SideNav />
          <article className={'w-full min-w-0'}>
            {frontmatter ? <h1 class={'mb-6 text-4xl font-bold'}>{frontmatter.title}</h1> : null}
            {children}
          </article>
        </main>
      </body>
    </html>
  )
})
