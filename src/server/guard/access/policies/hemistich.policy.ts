import { IPolicy } from "./IPolicy";
import { ResourceContext } from "../types";
import HemistichModel from "@server/models/hemistich";
import PoemModel, { IPoem } from "@server/models/poem";
import { AuthUser } from "../../utils/getUserFromRequest";
import { Action, Resource } from "@/enum/permission";

export class HemistichPolicy implements IPolicy {
    resource = Resource.HEMISTICH;

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        if (action === Action.CREATE) {
            const poemId = context.params?.poemId || context.body?.poem;
            if (!poemId) return false;

            const poem = await PoemModel.findById(poemId).lean();
            if (!poem) return false;

            return poem.author.toString() === user._id.toString();
        }

        const hemistichId = context.params?.hemistichId || context.params?.id;
        if (!hemistichId) return false;

        const hemistich = await HemistichModel
            .findById(hemistichId)
            .populate<{ poem: IPoem }>(Resource.POEM)
            .lean();

        if (!hemistich || !hemistich.poem || !hemistich.poem.author) return false;

        return hemistich.poem.author.toString() === user._id.toString();
    }
}
