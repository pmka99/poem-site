import mongoose, { Schema, Document } from "mongoose";
import { Resource, Action } from "@/enum/permission";
import { RoleName } from "@/enum/role";

export interface IRolePermission {
    resource: Resource;
    actions: Action[];
}

export interface IRole extends Document {
    name: RoleName;
    isSystem: boolean;
    permissions: IRolePermission[];
    createdAt: Date;
    updatedAt: Date;
}

const RolePermissionSchema = new Schema<IRolePermission>(
    {
        resource: {
            type: String,
            enum: Object.values(Resource),
            required: true,
        },
        actions: {
            type: [String],
            enum: Object.values(Action),
            required: true,
        },
    },
    { _id: false }
);

const RoleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            enum: Object.values(RoleName),
            required: true,
            unique: true,
        },
        isSystem: {
            type: Boolean,
            default: false,
        },
        permissions: {
            type: [RolePermissionSchema],
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export const RoleModel =
    mongoose.models.Role ||
    mongoose.model<IRole>("Role", RoleSchema);
