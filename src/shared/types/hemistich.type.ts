import { createHemistichSchema, deleteRangeHemistichSchema, moveRangeHemistichSchema, updateHemistichSchema, visibiltyRangeHemistichSchema } from "@/shared/schemas/hemistich.schema";
import { z } from "zod";

//---------------------------------------------------
// request

export type CreateHemistichDTO = z.infer<typeof createHemistichSchema>;
export type UpdateHemistichDTO = z.infer<typeof updateHemistichSchema>;

export type MoveRangeHemistichDTO = z.infer<typeof moveRangeHemistichSchema>;
export type DeleteRangeHemistichDTO = z.infer<typeof deleteRangeHemistichSchema>;
export type VisibiltyRangeHemistichDTO = z.infer<typeof visibiltyRangeHemistichSchema>;

//---------------------------------------------------
// response

export type HemistichResponse = {
    _id: string;
    poem: string;
    text: string;
    order: number;
    show: boolean;

    createdAt: Date;
    updatedAt: Date;
}