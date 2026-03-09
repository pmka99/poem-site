import { createStorySchema, updateStorySchema } from "@/shared/schemas/story.schema";
import { z } from "zod";

//---------------------------------------------------
// request

export type CreateStoryDTO = z.infer<typeof createStorySchema>;
export type UpdateStoryDTO = z.infer<typeof updateStorySchema>;