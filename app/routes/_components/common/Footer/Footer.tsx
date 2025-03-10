import { ThemeSwitcher } from './$ThemeSwitcher'

export const Footer = () => {
  return (
    <footer
      className={
        'border-t border-t-gray-200 bg-white py-8 shadow-sm dark:border-t-gray-800 dark:bg-gray-950'
      }
    >
      <div
        className={'mx-auto flex w-full max-w-[1300px] flex-row items-start justify-between px-8'}
      >
        <div className={'text-sm text-gray-600 dark:text-gray-400'}>
          <p>Released under the MIT License.</p>
          <p>Copyright © 2022-present Yusuke Wada & Hono contributors.</p>
        </div>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
