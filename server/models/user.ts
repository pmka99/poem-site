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
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

// // Hash password before save
// UserSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// UserSchema.methods.comparePassword = function (candidate: string) {
//     return bcrypt.compare(candidate, this.password);
// };

export const UserModel =
    mongoose.models.User ||
    mongoose.model<IUser>("User", UserSchema);