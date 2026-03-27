import { createPoemSchema, updatePoemSchema } from "@/shared/schemas/poem.schema";
import { z } from "zod";
import { UserResponse } from "./user.type";
import { PoemTypeResponse } from "./poemType.type";
import { HemistichResponse } from "./hemistich.type";
import { CommentResponse } from "./comment.type";
import { CategoryResponse } from "./category.type";

//---------------------------------------------------
// request

export type CreatePoemDTO = z.infer<typeof createPoemSchema>;
export type UpdatePoemDTO = z.infer<typeof updatePoemSchema>;


//---------------------------------------------------
// response

export interface PoemResponse {
    _id: string;
    title: string;
    author: string | UserResponse;
    story: string[];
    poemType: string | PoemTypeResponse;
    show: boolean;
    category: string | CategoryResponse;

    createdAt?: Date;
    updatedAt?: Date;

    hemistichs?: HemistichResponse[];
    comments?: CommentResponse[];
}
