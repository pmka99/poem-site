import { z } from "zod";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
