import { createCategorySchema, updateCategorySchema } from "@/shared/schemas/category.schema";
import { z } from "zod";

//---------------------------------------------------
// request

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;

//---------------------------------------------------
// response

export type CategoryResponse = {
    _id: string
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
