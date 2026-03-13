import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/server/utils/db";
import { verifyToken } from "@/server/utils/authUtils";
import  UserModel  from "@/server/models/user";

import { errorResponse, successResponse } from "@/server/utils/response";

export const GET = async () => {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return errorResponse({
                message: "احراز هویت انجام نشده است",
                status: 401
            });
        }

        const decoded: any = verifyToken(token);

        if (!decoded || !decoded.sub) {
            return errorResponse({
                message: "توکن احراز هویت نامعتبر است",
                status: 401
            });
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
            return errorResponse({
                message: "کاربری یافت نشد",
                status: 404
            });
        }

        return successResponse({
            data: user
        })

    } catch (error) {
        console.error("Get user error:", error);

        return errorResponse({
            message: "خطایی سمت سرور رخ داده است",
            status: 500
        });
    }
};
