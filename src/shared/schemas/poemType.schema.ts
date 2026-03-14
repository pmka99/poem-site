import { LayoutPoemType } from "@/enum/poemType";
import { z } from "zod";

export const createPoemTypeSchema = z.object({
    name: z.string().min(1, "نام نوع شعر الزامی است"),
    layout: z.enum(Object.values(LayoutPoemType)),
    description: z.string().optional(),
});

export const updatePoemTypeSchema = createPoemTypeSchema.partial();

