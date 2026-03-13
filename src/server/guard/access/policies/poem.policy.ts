import { IPolicy } from "./IPolicy";
import { ResourceContext } from "../types";
import PoemModel, { IPoem } from "@server/models/poem";
import { AuthUser } from "../../utils/getUserFromRequest";
import { Action, Resource } from "@/enum/permission";

export class PoemPolicy implements IPolicy {
    resource = Resource.POEM;

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        if (action === Action.CREATE) return true;

        const poemId = context.params?.poemId || context.params?.id;
        if (!poemId) return false;

        const poem: IPoem | null = await PoemModel.findById(poemId).lean();
        if (!poem) return false;

        // author owns poem
        if (poem.author.toString() === user._id.toString()) {
            return true;
        }

        return false;
    }
}