export type Action = "create" | "read" | "update" | "delete";

export interface PermissionRequirement {
    action: Action;
    resource: string;
}

export type AuthorizationMode = "AND" | "OR";

export interface ResourceContext {
    params?: Record<string, any>;
    query?: Record<string, any>;
    body?: any;
}