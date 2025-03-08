import type { MDXComponents } from 'mdx/types'
import { twMerge } from 'tailwind-merge'
import { ExternalLinkIcon } from '../../icons/ExternalLinkIcon'
import { AlertAnnotation } from './AlertAnnotation'
import { AnchorLink } from './AnchorLink'
import { CodeBlock } from './CodeBlock'
import { getAnchorId, getAnchorTitle } from './util'

export const useMDXComponents = (): MDXComponents => {
  return {
    h1: ({ children, id, className, ...props }) => {
      return (
        <h1
          {...props}
          className={twMerge(
            'group relative mt-10 mb-6 border-t border-t-gray-200 pt-8 text-4xl font-bold dark:border-t-gray-800',
            className
          )}
          id={id ?? getAnchorId(children)}
        >
          {children}
          <AnchorLink anchorId={getAnchorId(children)} anchorTitle={getAnchorTitle(children)} />
        </h1>
      )
    },
    h2: ({ children, id, className, ...props }) => {
      return (
        <h2
          {...props}
          className={twMerge(
            'group relative mt-10 mb-6 border-t border-t-gray-200 pt-8 text-3xl font-bold dark:border-t-gray-800',
            className
          )}
          id={id ?? getAnchorId(children)}
        >
          {children}
          <AnchorLink anchorId={getAnchorId(children)} anchorTitle={getAnchorTitle(children)} />
        </h2>
      )
    },
    h3: ({ children, id, className, ...props }) => {
      return (
        <h3
          {...props}
          className={twMerge('group relative mt-8 mb-3 text-2xl font-bold', className)}
          id={id ?? getAnchorId(children)}
        >
          {children}
          <AnchorLink anchorId={getAnchorId(children)} anchorTitle={getAnchorTitle(children)} />
        </h3>
      )
    },
    h4: ({ children, id, className, ...props }) => {
      return (
        <h4
          {...props}
          className={twMerge('group relative mt-6 mb-3 text-xl font-bold', className)}
          id={id ?? getAnchorId(children)}
        >
          {children}
          <AnchorLink anchorId={getAnchorId(children)} anchorTitle={getAnchorTitle(children)} />
        </h4>
      )
    },
    h5: ({ children, id, className, ...props }) => {
      return (
        <h5
          {...props}
          className={twMerge('group relative mt-6 mb-3 text-lg font-bold', className)}
          id={id ?? getAnchorId(children)}
        >
          {children}
          <AnchorLink anchorId={getAnchorId(children)} anchorTitle={getAnchorTitle(children)} />
        </h5>
      )
    },
    h6: ({ children, id, className, ...props }) => {
      return (
        <h6
          {...props}
          className={twMerge('group relative mt-4 mb-3 text-lg font-semibold', className)}
          id={id ?? getAnchorId(children)}
        >
          {children}
          <AnchorLink anchorId={getAnchorId(children)} anchorTitle={getAnchorTitle(children)} />
        </h6>
      )
    },

    p: ({ children, className, ...props }) => {
      return (
        <p {...props} className={twMerge('my-4 leading-relaxed', className)}>
          {children}
        </p>
      )
    },
    code: ({ children, className, ...props }) => {
      return (
        <code
          {...props}
          className={twMerge(
            'mx-0.5 rounded-sm bg-black/10 px-1 py-0.5 text-[0.875em] dark:bg-white/10',
            className
          )}
        >
          {children}
        </code>
      )
    },
    pre: ({ children, className, ...props }) => {
      return (
        <pre
          {...props}
          className={twMerge('overflow-x-auto rounded-lg bg-black/10 p-4', className)}
        >
          {children}
        </pre>
      )
    },
    ul: ({ children, className, ...props }) => {
      return (
        <ul
          {...props}
          className={twMerge(
            'my-4 list-disc pl-4 has-[li>input]:list-none has-[li>input]:pl-0 [&_ul,ol]:my-0',
            className
          )}
        >
          {children}
        </ul>
      )
    },
    ol: ({ children, className, ...props }) => {
      return (
        <ol {...props} className={twMerge('my-4 list-decimal pl-4 [&_ul,ol]:my-0', className)}>
          {children}
        </ol>
      )
    },
    blockquote: ({ children, className, ...props }) => {
      return (
        <blockquote
          {...props}
          className={twMerge('my-4 border-l-4 border-gray-300 pl-4', className)}
        >
          {children}
        </blockquote>
      )
    },
    table: ({ children, className, ...props }) => {
      return (
        <table
          {...props}
          className={twMerge(
            'my-4 w-auto max-w-full border-collapse border-spacing-0.5 overflow-x-auto border border-gray-300 dark:border-gray-700',
            className
          )}
        >
          {children}
        </table>
      )
    },
    tr: ({ children, className, ...props }) => {
      return (
        <tr
          {...props}
          className={twMerge('border-t border-gray-300 dark:border-gray-700', className)}
        >
          {children}
        </tr>
      )
    },
    th: ({ children, className, ...props }) => {
      return (
        <th
          {...props}
          className={twMerge(
            'border-r border-b border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-400',
            className
          )}
        >
          {children}
        </th>
      )
    },
    td: ({ children, className, ...props }) => {
      return (
        <td
          {...props}
          className={twMerge(
            'border-r border-b border-gray-300 px-4 py-2 text-sm dark:border-gray-700',
            className
          )}
        >
          {children}
        </td>
      )
    },
    tbody: ({ children, className, ...props }) => {
      return (
        <tbody {...props} className={twMerge('[&>tr:nth-child(2n)]:bg-gray-900', className)}>
          {children}
        </tbody>
      )
    },
    a: ({ children, href, className, ...props }) => {
      const isInternal = href.startsWith('/') && !href.startsWith('//')
      return (
        <a
          {...props}
          href={href}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
          className={twMerge(
            'font-medium text-orange-600 hover:text-orange-700 hover:underline dark:text-orange-400 dark:hover:text-orange-300',
            className
          )}
        >
          {children}
          {isInternal ? null : (
            <ExternalLinkIcon
              className={'ml-[0.125em] inline-block size-[0.75em] opacity-80'}
              aria-hidden
            />
          )}
        </a>
      )
    },
    hr: ({ className, ...props }) => {
      return (
        <hr
          {...props}
          className={twMerge('my-8 border-t-4 border-gray-300 dark:border-gray-700', className)}
        />
      )
    },
    codeblock: CodeBlock,
    alertannotation: AlertAnnotation,
  }
}
