import type { JSX } from 'hono/jsx'
import { Child, useState } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'
import { CheckIcon } from '../../icons/CheckIcon'
import { CopyIcon } from '../../icons/CopyIcon'

type CopyButtonProps = {
  text: string
} & Omit<JSX.IntrinsicElements['button'], 'onClick'>

export const CopyButton = ({ text, className, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={onClick}
      className={twMerge(
        'size-8 rounded-sm bg-white p-2 text-gray-600 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-black dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700',
        className
      )}
      aria-label={'Copy Code'}
      {...props}
    >
      {copied ? (
        <CheckIcon className={'h-full w-full'} />
      ) : (
        <CopyIcon className={'h-full w-full'} />
      )}
    </button>
  )
}
