import { z } from "zod";

export const createPoemTypeSchema = z.object({
    name: z.string().min(1, "نام نوع شعر الزامی است"),
    description: z.string().optional(),
});

export const updatePoemTypeSchema = createPoemTypeSchema.partial();

export type CreatePoemTypeDTO = z.infer<typeof createPoemTypeSchema>;
export type UpdatePoemTypeDTO = z.infer<typeof updatePoemTypeSchema>;