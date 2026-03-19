import { createCommentSchema, updateCommentSchema } from "@/shared/schemas/comment.schema";
import { z } from "zod";

//---------------------------------------------------
// request

export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
export type UpdateCommentDTO = z.infer<typeof updateCommentSchema>;

//---------------------------------------------------
// response


export type CommentResponse = {
    _id: string;
    user: string;
    poem: string;
    text: string;
    parrent?: string;

    createdAt: Date;
    updatedAt: Date;
}