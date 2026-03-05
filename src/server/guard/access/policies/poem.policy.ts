import { IPolicy } from "./IPolicy";
import { Action, ResourceContext } from "../types";
import PoemModel, { IPoem } from "../../../models/poem";
import { AuthUser } from "../../utils/getUserFromRequest";

export class PoemPolicy implements IPolicy {
    resource = "poem";

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        // create poem → فقط داشتن permission کافیست
        if (action === "create") return true;

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