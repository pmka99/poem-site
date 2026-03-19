import { createHemistichSchema, updateHemistichSchema } from "@/shared/schemas/hemistich.schema";
import { z } from "zod";

//---------------------------------------------------
// request

export type CreateHemistichDTO = z.infer<typeof createHemistichSchema>;
export type UpdateHemistichDTO = z.infer<typeof updateHemistichSchema>;


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