import { IRole } from "@/server/models/role";
import { RoleResponse } from "@/shared/types/role.type";
import { mapId } from "../utils/mapper";

export const toRoleResponse = (doc: IRole): RoleResponse => ({
    _id: mapId(doc._id),
    name: doc.name,
    isSystem: doc.isSystem,
    permissions: doc.permissions,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
