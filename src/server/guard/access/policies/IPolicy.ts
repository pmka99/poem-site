import { Resource, Action } from "@/enum/permission";
import { AuthUser } from "../../utils/getUserFromRequest";
import { ResourceContext } from "../types";

export interface IPolicy {
    resource: Resource;

    canAccess(
        user: AuthUser,
        action: Action,
        context: ResourceContext
    ): Promise<boolean>;
}