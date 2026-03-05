import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    username: string;
    phoneNumber: string;
    password: string;
    role: Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            unique: true, 
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Index
UserSchema.index({ role: 1 });

export const UserModel =
    mongoose.models.User ||
    mongoose.model<IUser>("User", UserSchema);