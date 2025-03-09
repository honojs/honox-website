import type { TocEntry } from '@stefanprobst/rehype-extract-toc'
import { useEffect, useState } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'

export const ToCList = ({
  tableOfContents,
  className,
  currentId,
}: {
  tableOfContents: Array<TocEntry>
  className?: string
  currentId: string
}) => {
  return (
    <ul className={twMerge('my-1 text-gray-600 dark:text-gray-400', className)}>
      {tableOfContents.map((tableOfContents) => {
        return (
          <li key={tableOfContents.id} className={'py-1'}>
            <a
              data-active={currentId === tableOfContents.id ? '' : undefined}
              class={
                'block transition-colors hover:text-gray-900 data-active:text-orange-600 dark:hover:text-gray-100 dark:data-active:text-orange-400'
              }
              href={`#${tableOfContents.id}`}
            >
              {tableOfContents.value}
            </a>
            {tableOfContents.children ? (
              <ToCList
                currentId={currentId}
                tableOfContents={tableOfContents.children}
                className={'ml-4'}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export const TableOfContents = ({
  tableOfContents,
  className,
}: {
  tableOfContents: Array<TocEntry>
  className?: string
}) => {
  const [currentId, setCurrentId] = useState('')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            setCurrentId(id)
          }
        })
      },
      {
        threshold: 1,
        rootMargin: '120px 0px -75% 0px',
      }
    )
    function observeTableOfContents(tableOfContents: Array<TocEntry>) {
      tableOfContents.forEach((entry) => {
        if (entry.id) {
          const element = document.getElementById(entry.id)
          if (element) {
            observer.observe(element)
          }
        }
        if (entry.children) {
          observeTableOfContents(entry.children)
        }
      })
    }
    observeTableOfContents(tableOfContents)

    return () => {
      observer.disconnect()
    }
  }, [])
  return <ToCList tableOfContents={tableOfContents} className={className} currentId={currentId} />
}
