import { z } from "zod";

export const createCategorySchema = z.object({
    title: z.string().min(1, "نام موضوع شعر الزامی است"),
    description: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

