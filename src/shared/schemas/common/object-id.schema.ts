import mongoose from "mongoose";
import { z } from "zod";

export const objectIdSchema = z
    .string()
    .min(1, "شناسه الزامی است")
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "فرمت شناسه معتبر نیست",
    });
