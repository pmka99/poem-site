import { createPoemTypeSchema, updatePoemTypeSchema } from "@/shared/schemas/poemType.schema";
import { z } from "zod";
import { LayoutPoemType } from "@/enum/poemType";

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
    layout: LayoutPoemType
    createdAt: Date;
    updatedAt: Date;
}
