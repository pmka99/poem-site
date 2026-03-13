import { z } from "zod";

export const createHemistichSchema = z.object({
    text: z.string().min(1, "متن مصراع الزامی است"),
    order: z.number().int().min(0, "ترتیب باید عدد مثبت باشد"),
});

export const updateHemistichSchema = createHemistichSchema.partial();

