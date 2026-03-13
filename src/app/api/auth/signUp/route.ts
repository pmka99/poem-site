import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import { generateToken, hashPassword } from "@/server/utils/authUtils";
import UserModel, { IUser } from "@/server/models/user";
import RoleModel, { IRole } from "@/server/models/role";
import { RoleName } from "@/enum/role";
import { signUpSchema } from "@/shared/schemas/auth.schema";
import { SignUpDTO } from "@/shared/types/auth.type";
import { errorResponse, successResponse } from "@/server/utils/response";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        // validation
        const validatedBody = signUpSchema.parse(body)

        await connectDB();

        const hashedPassword = await hashPassword(validatedBody.password)

        // get user role
        const role: IRole | null = await RoleModel.findOne({ name: RoleName["USER"] })

        if (!role) {
            return errorResponse({
                message: "نقشی یافت نشد",
                status: 500
            })
        }

        const newUser: IUser = await UserModel.create({
            username: validatedBody.username,
            phoneNumber: validatedBody.phoneNumber,
            role: role._id.toString(),
            password: hashedPassword,
            isActive: true
        } as SignUpDTO)

        const token = generateToken({ sub: newUser._id.toString() })

        const response = successResponse({
            message: "ثبت نام کاربر با موفقیت انجام شد",
            status: 201,
            data: {
                id: newUser._id.toString(),
                username: newUser.username,
                phoneNumber: newUser.phoneNumber,
            }
        })

        const maxAgeHours = Number(process.env.EXPIRESIN_HOURS ?? 24)

        response.cookies.set({
            name: "access_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * maxAgeHours,
        });

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