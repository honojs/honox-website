import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'
import { Header } from './_components/common/Header/Header'

export default jsxRenderer(({ children }) => {
  return (
    <html
      lang='en'
      class={'bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100'}
    >
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Link rel='stylesheet' href='/app/style.css' />
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
})
