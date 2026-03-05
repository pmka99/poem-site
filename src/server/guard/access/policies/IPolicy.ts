import { AuthUser } from "../../utils/getUserFromRequest";
import { Action, ResourceContext } from "../types";

export interface IPolicy {
    resource: string;

    canAccess(
        user: AuthUser,
        action: Action,
        context: ResourceContext
    ): Promise<boolean>;
}