import type { JSX } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'
import { CodeLanguageIcon } from '../../icons/CodeLanguageIcon'

type CodeBlockProps = {
  language?: string
  filename?: string
} & JSX.IntrinsicElements['pre']

export const CodeBlock = ({
  children,
  className,
  language,
  filename,
  ...props
}: CodeBlockProps) => {
  return (
    <div
      className={twMerge(
        'my-4 w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {language && filename ? (
        <div
          className={
            'flex items-center justify-between border-b border-gray-300 p-4 dark:border-gray-700'
          }
        >
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
            {language ? <CodeLanguageIcon language={language} className={'size-4'} /> : null}
            {filename ? <span>{filename}</span> : null}
          </div>
        </div>
      ) : null}
      <pre className={'overflow-x-auto bg-gray-100 px-2 py-4 dark:bg-gray-900'}>
        <code>{children}</code>
      </pre>
    </div>
  )
}
