import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { Footer } from './_components/common/Footer/Footer'
import { Header } from './_components/common/Header/Header'

export default jsxRenderer(({ children }) => {
  return (
    <html
      lang='en'
      class={
        'scroll-pt-22 bg-white text-gray-900 antialiased scheme-light dark:bg-gray-950 dark:text-gray-100 dark:scheme-dark'
      }
    >
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Link rel='stylesheet' href='/app/style.css' />
        <Script src='/app/client.ts' async />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
          if(typeof window === 'undefined') return;
          const theme = window.localStorage.getItem("honox-docs-theme");
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else if (theme === 'light') {
            document.documentElement.classList.remove('dark')
          } else {
            document.documentElement.classList.toggle(
              'dark',
              window.matchMedia('(prefers-color-scheme: dark)').matches
            )
          }
          })()
          `,
          }}
        />
      </head>
      <body>
        <Header />
        <main className={'relative mx-auto my-12 flex w-full max-w-[1300px] flex-row gap-8 px-8'}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
})
