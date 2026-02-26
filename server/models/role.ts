import mongoose, { Schema, Document } from "mongoose";

export type Action = "create" | "read" | "update" | "delete";

export interface IRolePermission {
    resource: string;
    actions: Action[];
}

export interface IRole extends Document {
    name: string;
    permissions: IRolePermission[];
    isSystem?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const RolePermissionSchema = new Schema<IRolePermission>(
    {
        resource: {
            type: String,
            required: true,
            trim: true,
        },
        actions: {
            type: [String],
            enum: ["create", "read", "update", "delete"],
            required: true,
        },
    },
    { _id: false }
);

const RoleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        permissions: {
            type: [RolePermissionSchema],
            default: [],
        },
        isSystem: {
            type: Boolean,
            default: false, // برای admin و system role
        },
    },
    { timestamps: true }
);

// Index برای performance
RoleSchema.index({ name: 1 });

export const RoleModel =
    mongoose.models.Role ||
    mongoose.model<IRole>("Role", RoleSchema);