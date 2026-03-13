import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import { generateToken, isPhoneNumber, verifyPassword } from "@/server/utils/authUtils";
import UserModel, { IUser } from "@/server/models/user";
import { signInSchema } from "@/shared/schemas/auth.schema";
import { errorResponse, successResponse } from "@/server/utils/response";

export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        // validations
        const validatedData = signInSchema.parse(body);

        const { identifier, password } = validatedData;

        const isPhone = isPhoneNumber(identifier);

        await connectDB();

        const user: IUser | null = await UserModel.findOne({
            [isPhone ? "phoneNumber" : "username"]: identifier
        }).select("+password");

        if (!user) {
            return errorResponse(
                {
                    message: "نام کاربری/شماره موبایل یا رمز عبور اشتباه است",
                    status: 401
                },
            );
        }

        // check password
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
            return errorResponse(
                {
                    message: "نام کاربری/شماره موبایل یا رمز عبور اشتباه است",
                    status: 401
                },
            );
        }

        const token = generateToken({ sub: user._id.toString() })

        const response = successResponse({
            message: "ورود  با موفقیت انجام شد",
            data: {
                id: user._id.toString(),
                username: user.username,
                phoneNumber: user.phoneNumber,
            },
            status: 200
        })

        const maxAgeHours = Number(process.env.EXPIRESIN_HOURS ?? 24)

        response.cookies.set(
            "access_token",
            token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * maxAgeHours
            }
        );

        return response;

    } catch (err: any) {
        if (err.name === 'ZodError') {
            return errorResponse({
                message: "فرمت داده های ورودی اشتباه است",
                status: 400
            })
        }

        console.error("Error creating user:", err);

        return errorResponse({
            message: "خطایی سمت سرور رخ داده است",
            status: 500
        })
    }

}