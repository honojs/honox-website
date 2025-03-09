import type { JSX } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'
import { AlertAnnotationIcon } from '../../icons/AlertAnnotationIcon'

type AlertAnnotationProps = {
  type: 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION'
} & JSX.IntrinsicElements['blockquote']

const getAlertName = (type: AlertAnnotationProps['type']) => {
  switch (type) {
    case 'NOTE':
      return 'Note'
    case 'TIP':
      return 'Tip'
    case 'IMPORTANT':
      return 'Important'
    case 'WARNING':
      return 'Warning'
    case 'CAUTION':
      return 'Caution'
    default:
      return null
  }
}

export const AlertAnnotation = ({ children, type, className, ...props }: AlertAnnotationProps) => {
  return (
    <blockquote
      {...props}
      className={twMerge(
        'my-4 border-l-4 border-gray-300 pl-4 [&_p]:my-2',
        type === 'NOTE' && 'border-blue-600 dark:border-blue-400',
        type === 'TIP' && 'border-green-600 dark:border-green-500',
        type === 'IMPORTANT' && 'border-purple-600 dark:border-purple-400',
        type === 'WARNING' && 'border-orange-600 dark:border-orange-500',
        type === 'CAUTION' && 'border-red-500 dark:border-red-400',
        className
      )}
    >
      {getAlertName(type) ? (
        <div
          className={twMerge(
            'my-1 flex items-center gap-1.5 font-medium',
            type === 'NOTE' && 'text-blue-600 dark:text-blue-400',
            type === 'TIP' && 'text-green-600 dark:text-green-500',
            type === 'IMPORTANT' && 'text-purple-600 dark:text-purple-400',
            type === 'WARNING' && 'text-orange-600 dark:text-orange-500',
            type === 'CAUTION' && 'text-red-500 dark:text-red-400'
          )}
        >
          <AlertAnnotationIcon type={type} className={'size-[1.1em]'} /> {getAlertName(type)}
        </div>
      ) : null}

      {children}
    </blockquote>
  )
}
