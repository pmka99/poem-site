import { z } from "zod";

export const createPoemTypeSchema = z.object({
    name: z.string().min(1, "نام نوع شعر الزامی است"),
    layout: z.number(),
    description: z.string().optional(),
});

export const updatePoemTypeSchema = createPoemTypeSchema.partial();

