import {
    PermissionRequirement,
    AuthorizationMode,
    ResourceContext
} from "./types";
import { IPolicyRegistry } from "./policyRegistry";
import { AuthUser } from "../utils/getUserFromRequest";
import { RoleName } from "@/enum/role";

export class AccessService {

    constructor(private policyRegistry: IPolicyRegistry) { }

    async canAccess(
        user: AuthUser,
        requirements: PermissionRequirement[],
        context: ResourceContext,
        mode: AuthorizationMode = "AND"
    ): Promise<boolean> {

        // Admin bypass
        if (user.role?.name === RoleName.ADMIN) {
            return true;
        }

        const checks = await Promise.all(
            requirements.map(r =>
                this.checkSingle(user, r, context)
            )
        );

        return mode === "AND"
            ? checks.every(Boolean)
            : checks.some(Boolean);
    }

    private async checkSingle(
        user: any,
        requirement: PermissionRequirement,
        context: ResourceContext
    ) {

        const rolePerm = user.role?.permissions?.find(
            (p: any) => p.resource === requirement.resource
        );

        if (!rolePerm ||
            !rolePerm.actions.includes(requirement.action)) {
            return false;
        }

        const policy = this.policyRegistry.get(requirement.resource);
        if (!policy) return false;

        return policy.canAccess(user, requirement.action, context);
    }
}