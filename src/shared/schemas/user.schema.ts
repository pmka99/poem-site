import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createUserSchema = z.object({
    username: z.string().min(3, "نام کاربری حداقل ۳ کاراکتر باشد"),
    phoneNumber: z.string().regex(/^(0|\+98)?9\d{9}$/, "شماره موبایل معتبر نیست"),
    password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
    role: objectIdSchema,
    isActive: z.boolean().optional()
});

export const updateUserSchema = createUserSchema.partial();

