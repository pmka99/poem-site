import { signInSchema, signUpSchema } from "@/shared/schemas/auth.schema";
import { z } from "zod";
import { RoleResponse } from "./role.type";

//---------------------------------------------------
// request

export type SignInDTO = z.infer<typeof signInSchema>;
export type SignUpDTO = z.infer<typeof signUpSchema>;

//---------------------------------------------------
// response

export interface SignInResponse {
    id: string;
    username: string;
    phoneNumber: string;
}

export interface SignUpResponse {
    id: string;
    username: string;
    phoneNumber: string;
}


export type UserInfoResponse = {
    _id: string;
    username: string;
    phoneNumber: string;
    role: string | RoleResponse;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}