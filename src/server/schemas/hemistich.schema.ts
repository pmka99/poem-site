import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createHemistichSchema = z.object({
    poemId: objectIdSchema,
    text: z.string().min(1, "متن مصراع الزامی است"),
    order: z.number().int().min(0, "ترتیب باید عدد مثبت باشد"),
});

export const updateHemistichSchema = createHemistichSchema.partial();

export type CreateHemistichDTO = z.infer<typeof createHemistichSchema>;
export type UpdateHemistichDTO = z.infer<typeof updateHemistichSchema>;