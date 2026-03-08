import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import { generateToken, isPhoneNumber, verifyPassword } from "@/server/utils/authUtils";
import { IUser, UserModel } from "@/server/models/user";
import { signInSchema } from "@/shared/schemas/auth.schema";

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
        });

        if (!user) {
            return NextResponse.json(
                { error: "نام کاربری/شماره موبایل یا رمز عبور اشتباه است" },
                { status: 401 }
            );
        }

        // check password
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "نام کاربری/شماره موبایل یا رمز عبور اشتباه است" },
                { status: 401 }
            );
        }

        const token = generateToken({ sub: user._id.toString() })

        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user._id.toString(),
                    username: user.username,
                    phoneNumber: user.phoneNumber,
                },
            },
            { status: 200 }
        );

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
            return NextResponse.json(
                { error: "Validation failed", details: err.errors },
                { status: 400 });
        }

        console.error("Error creating user:", err);
        return NextResponse.json(
            { error: err?.message ?? "An error occurred" },
            { status: 500 }
        );
    }

}