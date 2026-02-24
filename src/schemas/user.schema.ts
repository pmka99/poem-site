import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().min(3, "نام کاربری حداقل ۳ کاراکتر باشد"),
    phoneNumber: z.string().min(10, "شماره موبایل معتبر نیست"),
    password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
    role: z.enum(["user", "admin", "author"]).default("user"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;