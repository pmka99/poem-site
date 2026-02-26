import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createCommentSchema = z.object({
    userId: objectIdSchema,
    poemId: objectIdSchema,
    text: z.string().min(1, "متن کامنت الزامی است"),
    replyId: objectIdSchema.optional(),
});

export const updateCommentSchema = createCommentSchema.partial();

export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
export type UpdateCommentDTO = z.infer<typeof updateCommentSchema>;