import { Action, Resource } from "@/enum/permission";
import { RoleName } from "@/enum/role";
import { IRolePermission } from "@/server/models/role";
















//---------------------------------------------------
// response


export type RoleResponse = {
    _id: string;
    name: RoleName;
    isSystem: boolean;
    permissions: {
        resource: Resource;
        actions: Action[];
    }[];
    createdAt: Date;
    updatedAt: Date;
}