import { IUser } from "@/server/models/user";
import { SignInResponse, SignUpResponse } from "@/shared/types/auth.type";
import { mapId, mapRelation } from "../utils/mapper";
import { toRoleResponse } from "./role.mapper";

export const toSignInResponse = (doc: IUser): SignInResponse => ({
    _id: mapId(doc._id),
    username: doc.username,
    phoneNumber: doc.phoneNumber,

    role: mapRelation(doc.role, toRoleResponse),

    isActive: doc.isActive,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});

export const toSignUpResponse = (doc: IUser): SignUpResponse => ({
    id: mapId(doc._id),
    username: doc.username,
    phoneNumber: doc.phoneNumber,
});
