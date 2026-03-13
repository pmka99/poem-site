import { Action, Resource } from "@/enum/permission";

export interface PermissionRequirement {
    action: Action;
    resource: Resource;
}

export type AuthorizationMode = "AND" | "OR";

export interface ResourceContext {
    params?: Record<string, any>;
    query?: Record<string, any>;
    body?: any;
}