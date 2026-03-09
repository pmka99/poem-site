import { createPoemTypeSchema, updatePoemTypeSchema } from "@/shared/schemas/poemType.schema";
import { z } from "zod";

//---------------------------------------------------
// request

export type CreatePoemTypeDTO = z.infer<typeof createPoemTypeSchema>;
export type UpdatePoemTypeDTO = z.infer<typeof updatePoemTypeSchema>;