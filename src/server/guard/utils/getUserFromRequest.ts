import jwt from "jsonwebtoken";
import UserModel, { IUser } from "../../models/user";
import { cookies } from "next/headers";
import { connectDB } from "@/server/utils/db";
import { verifyToken } from "@/server/utils/authUtils";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthUser {
    _id: string;
    username: string;
    role: any;
}

export async function getUserFromRequest(req: any): Promise<AuthUser | null> {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return null;
        }

        const decoded: any = verifyToken(token);

        if (!decoded || !decoded.sub) {
            return null;

        }

        await connectDB();
        console.log("decoded.sub", decoded.sub);

        const user =
            await UserModel
                .findById(decoded.sub)
                .select("")
                .populate({
                    path: "role",
                    select: "permissions name -_id"
                })
                .lean()

        if (!user) {
            return null;
        }
        
        return {
            _id: user._id.toString(),
            username: user.username,
            role: user.role
        }

    } catch (err) {
        return null;
    }
}