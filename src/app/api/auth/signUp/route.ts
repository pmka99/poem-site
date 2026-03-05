import { connectDB } from "@server/utils/db";
import { NextResponse } from "next/server";
import { generateToken, hashPassword } from "@server/utils/authUtils";
import { IUser, UserModel } from "@server/models/user";
import { IRole, RoleModel } from "@server/models/role";
import { RoleName } from "@/enum/role";
import { CreateUserDTO, createUserSchema } from "@server/schemas/user.schema";

export const POST = async (req: Request) => {

    try {
        const body = await req.json();

        // validation
        const validatedBody = createUserSchema.parse(body)

        await connectDB();

        const hashedPassword = await hashPassword(validatedBody.password)

        // get user role
        const role: IRole | null = await RoleModel.findOne({ name: RoleName["USER"] })

        if (!role) {
            return NextResponse.json({ error: "Role not found" }, { status: 500 });
        }

        const newUser: IUser = await UserModel.create({
            username: validatedBody.username,
            phoneNumber: validatedBody.phoneNumber,
            role: role._id.toString(),
            password: hashedPassword,
            isActive: true
        } as CreateUserDTO)

        const token = generateToken({ sub: newUser._id.toString() })

        const response = NextResponse.json(
            { message: "User Created Successfully" },
            { status: 201 }
        );

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