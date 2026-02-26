import { z } from "zod";

export const createStorySchema = z.object({
    text: z.string().min(1, "متن الزامی است"),
    order: z.number().int().min(0, "ترتیب باید عدد مثبت باشد"),
});

export const updateStorySchema = createStorySchema.partial();

export type CreateStoryDTO = z.infer<typeof createStorySchema>;
export type UpdateStoryDTO = z.infer<typeof updateStorySchema>;