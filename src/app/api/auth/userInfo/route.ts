import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/server/utils/db";
import { verifyToken } from "@/server/utils/authUtils";
import { UserModel } from "@/server/models/user";

export const GET = async () => {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded: any = verifyToken(token);

        if (!decoded || !decoded.sub) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await UserModel.findById(decoded.sub).select(
            "_id username phoneNumber createdAt"
        );

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                user: {
                    id: user._id,
                    username: user.username,
                    phoneNumber: user.phoneNumber,
                    createdAt: user.createdAt,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Get user error:", error);

        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
};
