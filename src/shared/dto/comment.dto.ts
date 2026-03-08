import { createCommentSchema, updateCommentSchema } from "@/shared/schemas/comment.schema";
import { z } from "zod";

export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
export type UpdateCommentDTO = z.infer<typeof updateCommentSchema>;