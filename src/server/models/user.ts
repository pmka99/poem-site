import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string;
    phoneNumber: string;
    password: string;
    role: "user" | "admin" | "author";
}

export const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "author"], default: "user" }
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;