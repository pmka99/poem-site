import { createPoemTypeSchema, updatePoemTypeSchema } from "@/shared/schemas/poemType.schema";
import { z } from "zod";

//---------------------------------------------------
// request

export type CreatePoemTypeDTO = z.infer<typeof createPoemTypeSchema>;
export type UpdatePoemTypeDTO = z.infer<typeof updatePoemTypeSchema>;

//---------------------------------------------------
// response

export type PoemTypeResponse = {
    _id: string
    name: string;
    description: string;
    layout: number
    createdAt: Date;
    updatedAt: Date;
}
