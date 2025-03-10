import type { JSX } from 'hono/jsx'
import { createHighlighter, makeSingletonHighlighter } from 'shiki'
import { twMerge } from 'tailwind-merge'
import { CodeLanguageIcon } from '../../icons/CodeLanguageIcon'
import { CopyButton } from './$CopyButton'

type CodeBlockProps = {
  language?: string
  filename?: string
  children: string
} & JSX.IntrinsicElements['pre']

const getHighlighter = makeSingletonHighlighter(createHighlighter)

export const CodeBlock = async ({
  children,
  className,
  language,
  filename,
  ...props
}: CodeBlockProps) => {
  const highlighter = await getHighlighter({
    themes: ['one-light', 'one-dark-pro'],
    langs: ['tsx', 'typescript', 'javascript', 'jsx'],
  })

  const code =
    language && typeof children === 'string'
      ? highlighter.codeToHtml(children, {
          themes: {
            light: 'one-light',
            dark: 'one-dark-pro',
          },
          lang: language,
        })
      : null

  return (
    <div
      className={twMerge(
        'group relative my-4 w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {language && filename ? (
        <div
          className={
            'flex items-center justify-between border-b border-gray-300 py-2 pr-2 pl-4 dark:border-gray-700'
          }
        >
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
            {language ? <CodeLanguageIcon language={language} className={'size-4'} /> : null}
            {filename ? <span>{filename}</span> : null}
          </div>
          <CopyButton text={children} />
        </div>
      ) : (
        <CopyButton
          text={children}
          className={
            'absolute top-2 right-2 opacity-0 transition-[opacity_backgroud-color] group-hover:opacity-100'
          }
        />
      )}
      {code ? (
        <div
          className={
            '[&_pre]:overflow-x-auto [&_pre]:px-2 [&_pre]:py-4 dark:[&_pre]:!bg-(--shiki-dark-bg) dark:[&_span]:!bg-(--shiki-dark-bg) dark:[&_span]:!text-(--shiki-dark)'
          }
          dangerouslySetInnerHTML={{
            __html: code,
          }}
        ></div>
      ) : (
        <pre className={'overflow-x-auto bg-gray-100 px-2 py-4 dark:bg-gray-900'}>
          {code ? <code className={'block'} /> : children}
        </pre>
      )}
    </div>
  )
}
