import { z } from "zod";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { RoleResponse } from "./role.type";

//---------------------------------------------------
// request

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

//---------------------------------------------------
// response

export type UserResponse = {
    _id: string;
    username: string;
    phoneNumber: string;
    role: string | RoleResponse;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
