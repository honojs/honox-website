import type { JSX } from 'hono/jsx'
import { useState } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'
import { ThemeDarkIcon } from '../../icons/ThemeDarkIcon'
import { ThemeLightIcon } from '../../icons/ThemeLightIcon'
import { ThemeSystemIcon } from '../../icons/ThemeSystemIcon'

type ThemeSwitcherProps = {} & JSX.IntrinsicElements['fieldset']

const getLocalStorageTheme = () => {
  if (typeof window === 'undefined') {
    return 'system'
  }
  const theme = window.localStorage.getItem('honox-docs-theme')
  if (theme === 'light' || theme === 'dark' || theme === 'system') {
    return theme
  }
  return 'system'
}

export const ThemeSwitcher = ({ className, ...props }: ThemeSwitcherProps) => {
  const [theme, setTheme] = useState<'light' | 'system' | 'dark'>(
    getLocalStorageTheme() || 'system'
  )

  const handleChange = (theme: 'light' | 'system' | 'dark') => {
    return (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const checked = event.target.checked
        if (checked) {
          setTheme(theme)
          window.localStorage.setItem('honox-docs-theme', theme)
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else if (theme === 'light') {
            document.documentElement.classList.remove('dark')
          } else {
            // System が選択された場合は OS の設定を見て切り替える
            document.documentElement.classList.toggle(
              'dark',
              window.matchMedia('(prefers-color-scheme: dark)').matches
            )
          }
        }
      }
    }
  }

  return (
    <fieldset
      className={twMerge(
        'flex items-center rounded-full bg-gray-200 p-0.5 dark:bg-gray-800',
        className
      )}
      {...props}
    >
      <legend className={'sr-only'}>Select display theme:</legend>
      <span>
        <input
          aria-label={'light'}
          type={'radio'}
          value={'light'}
          id={'theme-switcher-light'}
          className={'peer absolute h-0 w-0 appearance-none'}
          onChange={handleChange('light')}
          checked={theme === 'light'}
        />
        <label
          htmlFor={'theme-switcher-light'}
          className={
            'block size-7 cursor-pointer rounded-full p-1.5 peer-checked:bg-white checked:bg-white hover:bg-gray-300 dark:peer-checked:bg-black dark:checked:bg-black dark:hover:bg-gray-700'
          }
        >
          <span className={'sr-only'}>Light</span>
          <ThemeLightIcon className='h-full w-full' />
        </label>
      </span>
      <span>
        <input
          aria-label={'system'}
          type={'radio'}
          value={'system'}
          id={'theme-switcher-system'}
          className={'peer absolute h-0 w-0 appearance-none'}
          onChange={handleChange('system')}
          checked={theme === 'system'}
        />
        <label
          htmlFor={'theme-switcher-system'}
          className={
            'block size-7 cursor-pointer rounded-full p-1.5 peer-checked:bg-white hover:bg-gray-300 dark:peer-checked:bg-black dark:hover:bg-gray-700'
          }
        >
          <span className={'sr-only'}>System</span>
          <ThemeSystemIcon className='h-full w-full' />
        </label>
      </span>
      <span>
        <input
          aria-label={'dark'}
          type={'radio'}
          value={'dark'}
          id={'theme-switcher-dark'}
          className={'peer absolute h-0 w-0 appearance-none'}
          onChange={handleChange('dark')}
          checked={theme === 'dark'}
        />
        <label
          htmlFor={'theme-switcher-dark'}
          className={
            'block size-7 cursor-pointer rounded-full p-1.5 peer-checked:bg-white hover:bg-gray-300 dark:peer-checked:bg-black dark:hover:bg-gray-700'
          }
        >
          <span className={'sr-only'}>Dark</span>
          <ThemeDarkIcon className='h-full w-full' />
        </label>
      </span>
    </fieldset>
  )
}
