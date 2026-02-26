import { IPolicy } from "./IPolicy";
import { Action, ResourceContext } from "../types";
import CommentModel, { IComment } from "../../../models/comment";
import PoemModel, { IPoem } from "../../../models/poem";
import { AuthUser } from "../../utils/getUserFromRequest";

export class CommentPolicy implements IPolicy {
    resource = "comment";

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        const commentId = context.params?.commentId || context.params?.id;
        if (!commentId) return false;

        const comment: IComment | null = await CommentModel.findById(commentId).lean();
        if (!comment) return false;

        // owner of comment
        if (comment.author.toString() === user._id.toString()) {
            return true;
        }

        // owner of poem
        const poem: IPoem | null = await PoemModel.findById(comment.poemId).lean();
        if (!poem) return false;

        return poem.author.toString() === user._id.toString();
    }
}