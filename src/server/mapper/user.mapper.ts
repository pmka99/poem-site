import { IUser } from "@/server/models/user";
import { UserResponse } from "@/shared/types/user.type";
import { mapId, mapRelation } from "../utils/mapper";
import { toRoleResponse } from "./role.mapper";

export const toUserResponse = (doc: IUser): UserResponse => ({
    _id: mapId(doc._id),
    username: doc.username,
    phoneNumber: doc.phoneNumber,

    role: mapRelation(doc.role, toRoleResponse),

    isActive: doc.isActive,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
