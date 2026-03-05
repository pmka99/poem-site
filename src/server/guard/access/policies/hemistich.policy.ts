import { IPolicy } from "./IPolicy";
import { Action, ResourceContext } from "../types";
import HemistichModel, { IHemistich } from "../../../models/hemistich";
import PoemModel, { IPoem } from "../../../models/poem";
import { AuthUser } from "../../utils/getUserFromRequest";

export class HemistichPolicy implements IPolicy {
    resource = "hemistich";

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        if (action === "create") return true;

        const hemistichId = context.params?.hemistichId || context.params?.id;
        if (!hemistichId) return false;

        const hemistich: IHemistich | null = await HemistichModel.findById(hemistichId).lean();
        if (!hemistich) return false;

        const poem: IPoem | null = await PoemModel.findById(hemistich.poemId).lean();
        if (!poem) return false;

        return poem.author.toString() === user._id.toString();
    }
}