import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createPoemSchema = z.object({
    title: z.string().min(1, "عنوان شعر الزامی است"),
    description: z.string().optional(),
    author: objectIdSchema,
    poemType: objectIdSchema,
    show: z.boolean().default(true),
    story: z.array(objectIdSchema).default([]),
});

export const updatePoemSchema = createPoemSchema.partial();

