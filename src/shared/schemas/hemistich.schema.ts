import { Position } from "@/enum/poem";
import { boolean, z } from "zod";

export const createHemistichSchema = z.object({
    text: z.string().min(1, "متن مصراع الزامی است"),
    show: z.boolean(),
    position: z.nativeEnum(Position),
    targetHemistichId: z.string().optional()
});

export const updateHemistichSchema = createHemistichSchema.partial();

const range = z.object({
    firstOrder: z.number(),
    lastOrder: z.number(),
});

export const moveRangeHemistichSchema = z.object({
    range,
    position: z.nativeEnum(Position),
    targetHemistichId: z.string().optional()
});

export const deleteRangeHemistichSchema = z.object({
    range,
});

export const visibiltyRangeHemistichSchema = z.object({
    show: z.boolean(),
    range,
});



