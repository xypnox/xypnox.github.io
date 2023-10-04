import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    coverImage: image().optional(),
    coverAlt: z.string().optional(),
  }),
})

export const collections = { blog }

