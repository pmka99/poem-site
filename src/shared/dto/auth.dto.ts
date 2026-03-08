import { signInSchema } from "@/shared/schemas/auth.schema";
import { z } from "zod";

export type SignInDTO = z.infer<typeof signInSchema>;
