import { z } from "zod";

export const objectIdSchema = z
    .string()
    .min(1, "شناسه الزامی است")
    .regex(/^[0-9a-fA-F]{24}$/, "آیدی معتبر نیست");
