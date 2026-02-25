import { z } from "zod";
import mongoose from "mongoose";

/**
 * Creates a Zod string schema that validates a MongoDB ObjectId.
 * Uses mongoose.Types.ObjectId.isValid to ensure the value is a valid ObjectId.
 *
 * @param fieldName - The name of the field being validated (used in the error message)
 * @returns Zod schema for validating a MongoDB ObjectId
 */
export const objectIdField = (fieldName: string) =>
    z
        .string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: `The ${fieldName} is not a valid ObjectId`,
        });

/**
 * Helper to create a Zod object schema with multiple ObjectId fields.
 * Each key will be validated as a MongoDB ObjectId and include its name in the error message.
 *
 * @param keys - An array of field names that should be validated as ObjectId
 * @returns A Zod object schema containing the specified ObjectId fields
 */
export const createIdParamsSchema = <T extends string[]>(...keys: T) =>
    z.object(
        Object.fromEntries(keys.map((key) => [key, objectIdField(key)])) as Record<
            T[number],
            z.ZodString
        >
    );