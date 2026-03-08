import { signInSchema, signUpSchema, } from "@/shared/schemas/auth.schema";
import { z } from "zod";

export type SignUpDTO = z.infer<typeof signUpSchema>;
export type SignInDTO = z.infer<typeof signInSchema>;
