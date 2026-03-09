import { signInSchema, signUpSchema } from "@/shared/schemas/auth.schema";
import { z } from "zod";

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