import jwt from "jsonwebtoken";
import { UserModel, IUser } from "../../models/user";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthUser {
    _id: string;
    username: string;
    role: any;
}

export async function getUserFromRequest(req: any): Promise<AuthUser | null> {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET) as {
            sub: string;
        };

        if (!decoded?.sub) return null;

        const user: IUser = await UserModel
            .findById(decoded.sub)
            .populate("role")
            .lean();

        if (!user) return null;

        return {
            _id: user._id.toString(),
            username: user.username,
            role: user.role,
        };

    } catch (err) {
        return null;
    }
}