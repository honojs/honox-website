import type { Frontmatter } from '../../../../global'
import { getDocsPagination } from './DocsPaginationUtil'

describe('DocsPaginationutil', () => {
  const docs: Record<string, { frontmatter?: Frontmatter }> = {
    '../../index.mdx': {
      frontmatter: {
        title: 'Home',
        nav_title: 'Home',
        description: 'Welcome to HonoX documentation.',
        exclude_from_nav: true,
      },
    },
    '../../testing.mdx': {
      frontmatter: {
        title: 'Testing',
        nav_title: 'Testing',
        description: 'Testing description',
        exclude_from_nav: false,
      },
    },
    '../../01-getting-started/01-basic.mdx': {
      frontmatter: {
        title: 'Getting Started - Basic',
        nav_title: 'Basic',
        description: null,
      },
    },
    '../../01-getting-started/02-with-client.mdx': {
      frontmatter: {
        title: 'Get Started - with Client',
        nav_title: 'with Client',
        description: null,
      },
    },
    '../../01-getting-started/byor/index.mdx': {
      frontmatter: {
        title: 'BYOR - Bring Your Own Renderer',
        nav_title: 'Bring Your Own Renderer',
        description: null,
      },
    },
    '../../01-getting-started/byor/react.mdx': {
      frontmatter: {
        title: 'React Renderer',
        nav_title: 'React',
        description: null,
      },
    },
    '../../01-getting-started/index.mdx': {
      frontmatter: {
        title: 'Getting Started',
        nav_title: 'Getting Started',
        description: 'Learn how to create a basic HonoX application.',
      },
    },
    '../../02-guide/01-nested-layouts.mdx': {
      frontmatter: {
        title: 'Nexted Layouts',
        nav_title: 'Nested Layouts',
        description: null,
      },
    },
    '../../02-guide/index.mdx': {
      frontmatter: {
        title: 'Guide',
        nav_title: 'Guide',
        description: 'Guide to create a HonoX application.',
      },
    },
  }
  it('Should be get next and previous page at correct paths.', () => {
    const docsPagination = getDocsPagination(docs, '/getting-started/basic')
    expect(docsPagination).toStrictEqual({
      previous: {
        path: '/getting-started',
        frontmatter: {
          title: 'Getting Started',
          nav_title: 'Getting Started',
          description: 'Learn how to create a basic HonoX application.',
        },
      },
      next: {
        path: '/getting-started/with-client',
        frontmatter: {
          title: 'Get Started - with Client',
          nav_title: 'with Client',
          description: null,
        },
      },
    })
  })

  it('Should be return null at incorrect paths.', () => {
    const docsPagination = getDocsPagination(docs, '/incorrect-path')
    expect(docsPagination).toStrictEqual(null)
  })
  it('Should be previous is last page at first page.', () => {
    const docsPagination = getDocsPagination(docs, '/')
    expect(docsPagination).toStrictEqual({
      next: {
        frontmatter: {
          description: 'Learn how to create a basic HonoX application.',
          nav_title: 'Getting Started',
          title: 'Getting Started',
        },
        path: '/getting-started',
      },
      previous: {
        frontmatter: {
          description: 'Testing description',
          exclude_from_nav: false,
          nav_title: 'Testing',
          title: 'Testing',
        },
        path: '/testing',
      },
    })
  })
  it('Should be next is first page at last page.', () => {
    const docsPagination = getDocsPagination(docs, '/testing')
    expect(docsPagination).toStrictEqual({
      previous: {
        path: '/guide/nested-layouts',
        frontmatter: {
          title: 'Nexted Layouts',
          nav_title: 'Nested Layouts',
          description: null,
        },
      },
      next: {
        path: '/',
        frontmatter: {
          title: 'Home',
          nav_title: 'Home',
          description: 'Welcome to HonoX documentation.',
          exclude_from_nav: true,
        },
      },
    })
  })
})
