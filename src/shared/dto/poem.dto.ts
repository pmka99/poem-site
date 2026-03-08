import { createPoemSchema, updatePoemSchema } from "@/shared/schemas/poem.schema";
import { z } from "zod";

export type CreatePoemDTO = z.infer<typeof createPoemSchema>;
export type UpdatePoemDTO = z.infer<typeof updatePoemSchema>;