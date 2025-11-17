import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const Image = z.object({
  src: z.string(),
  alt: z.string()
})

const Author = z.object({
  name: z.string(),
  description: z.string().optional(),
  to: z.string().optional(),
  avatar: Image.optional()
})

const defaultAuthor = {
  name: 'DeepGHS',
  to: 'https://deepghs.org',
  avatar: {
    src: 'https://cdn.xinhe-info.cn/dev/DeepGHS.png',
    alt: 'DeepGHS'
  }
}

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        image: z.string().editor({ input: 'media' }),
        authors: z.array(Author).default([defaultAuthor]),
        date: z.string().date(),
        draft: z.boolean().default(false),
        category: z.enum(['Uncategorized', 'Tutorial', 'Release', 'Article']).default('Uncategorized'),
        tags: z.array(z.string())
      })
    })
  }
})
