import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createPoemSchema = z.object({
    title: z.string().min(1, "عنوان شعر الزامی است"),
    author: objectIdSchema,
    poemType: objectIdSchema,
    show: z.boolean(),
    category: objectIdSchema,
    story: z.array(z.string()).default([]).optional(),
    order: z.number()
});

export const updatePoemSchema = createPoemSchema.partial();

