import type { Frontmatter } from '../../../../global'
import { getDocsChildPages } from './DocsChildPagesListUtil'

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
    const docsPagination = getDocsChildPages(docs, '/getting-started')
    expect(docsPagination).toStrictEqual([
      {
        path: '/getting-started/basic',
        frontmatter: {
          title: 'Getting Started - Basic',
          nav_title: 'Basic',
          description: null,
        },
      },
      {
        path: '/getting-started/with-client',
        frontmatter: {
          title: 'Get Started - with Client',
          nav_title: 'with Client',
          description: null,
        },
      },
      {
        path: '/getting-started/byor',
        frontmatter: {
          title: 'BYOR - Bring Your Own Renderer',
          nav_title: 'Bring Your Own Renderer',
          description: null,
        },
      },
    ])
  })

  it('Should be return empty array when incorrect paths.', () => {
    const docsPagination = getDocsChildPages(docs, '/incorrect-path')
    expect(docsPagination).toStrictEqual([])
  })
  it('Should be return empty array when child page is nothing.', () => {
    const docsPagination = getDocsChildPages(docs, '/getting-started/with-client')
    expect(docsPagination).toStrictEqual([])
  })
})
