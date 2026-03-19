import { IComment } from "@/server/models/comment";
import { CommentResponse } from "@/shared/types/comment.type";
import { mapId } from "../utils/mapper";

export const toCommentResponse = (doc: IComment): CommentResponse => ({
    _id: mapId(doc._id),
    user: mapId(doc.user),
    poem: mapId(doc.poem),
    text: doc.text,
    parrent: mapId(doc.parrent),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
