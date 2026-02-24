import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createPoemSchema = z.object({
    title: z.string().min(1, "عنوان شعر الزامی است"),
    description: z.string().optional(),
    author: objectIdSchema,
    poemType: objectIdSchema,
    show: z.boolean().default(true),
    story: z.array(objectIdSchema).default([]),
    comments: z.array(objectIdSchema).default([]),
    hemistichs: z.array(objectIdSchema).optional(),
});

export const updatePoemSchema = createPoemSchema.partial();

export type CreatePoemDTO = z.infer<typeof createPoemSchema>;
export type UpdatePoemDTO = z.infer<typeof updatePoemSchema>;