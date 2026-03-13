import { IPolicy } from "./IPolicy";
import { ResourceContext } from "../types";
import { AuthUser } from "../../utils/getUserFromRequest";
import { Action, Resource } from "@/enum/permission";

export class PoemPolicy implements IPolicy {
    resource = Resource.POEM;

    async canAccess(user: AuthUser, action: Action, context: ResourceContext) {

        if (action === Action.CREATE) return true;

        const poemTypeId = context.params?.poemTypeId || context.params?.id;
        if (!poemTypeId) return false;

        return true;
    }
}