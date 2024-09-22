import {z} from 'zod';
import { getBlogById } from '../controllers/blog.controller';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createBlogSchema = z.object({
    title: z.string().min(1).max(200),
    thumbnail: z.string().url(),
    tags: z.array(z.string()).min(1),
    description: z.string().min(1).max(500),
    blogContent: z.array(z.object({
      content: z.string(),
      contentType: z.enum(['text', 'image'])
    })).min(1),
    creatorId: z.string().regex(objectIdRegex)
});
  

export const getBlogByIdSchema = z.object({
    blogId: z.string().regex(objectIdRegex)
})

export const updateBlogByIdSchema = createBlogSchema.partial().extend({
    blogId: z.string().regex(objectIdRegex)
});

export const deleteBlogSchema = getBlogByIdSchema;