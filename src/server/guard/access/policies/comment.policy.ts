import { IPolicy } from "./IPolicy";
import { ResourceContext } from "../types";
import CommentModel, { IComment } from "../../../models/comment";
import PoemModel, { IPoem } from "../../../models/poem";
import { AuthUser } from "../../utils/getUserFromRequest";
import { Resource, Action } from "@/enum/permission";

export class CommentPolicy implements IPolicy {
    resource = Resource.COMMENT;

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        if (action === Action.CREATE) return true;

        const commentId = context.params?.commentId || context.params?.id;
        if (!commentId) return false;

        const comment: IComment | null = await CommentModel.findById(commentId).lean();
        if (!comment) return false;

        return comment.user.toString() === user._id.toString();
    }
}