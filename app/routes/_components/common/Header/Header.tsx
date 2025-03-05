import { SocialGitHubIcon } from '../../icons/SocialGitHubIcon'
import { SocialXIcon } from '../../icons/SocialXIcon'
import { HeaderLink } from './HeaderLink'
import { HeaderSocialLink } from './HeaderSocialLink'

export const Header = () => {
  return (
    <header class={'mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-2'}>
      <a href={'/'}>
        <h1 class={'text-xl font-bold'}>HonoX</h1>
      </a>
      <nav class={'flex items-center gap-4'}>
        <HeaderLink href={'/docs'}>Docs</HeaderLink>
        <HeaderLink href={'/examples'}>Examples</HeaderLink>
        <HeaderLink href={'https://github.com/orgs/honojs/discussions'} isExternal>
          Discussions
        </HeaderLink>
        <div
          role={'separator'}
          aria-orientation={'vertical'}
          class={'mx-1 h-6 w-[1px] bg-gray-800 opacity-30 dark:bg-gray-400'}
        />
        <HeaderSocialLink
          href={'https://github.com/honojs'}
          icon={<SocialGitHubIcon class={'h-full w-full'} />}
        />
        <HeaderSocialLink
          href={'https://x.com/honojs'}
          icon={<SocialXIcon class={'h-full w-full'} />}
        />
      </nav>
    </header>
  )
}
