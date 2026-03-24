import { Position } from "@/enum/poem";
import { z } from "zod";

export const createHemistichSchema = z.object({
    text: z.string().min(1, "متن مصراع الزامی است"),
    show: z.boolean(),
    position: z.nativeEnum(Position),
    targetHemistichId: z.string().optional()
});

export const updateHemistichSchema = createHemistichSchema.partial();

