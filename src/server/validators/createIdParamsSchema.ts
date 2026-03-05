import { z } from "zod";
import mongoose from "mongoose";

/**
 * Creates a Zod string schema that validates a MongoDB ObjectId.
 * Uses mongoose.Types.ObjectId.isValid to ensure the value is a valid ObjectId.
 *
 * @param fieldName - The name of the field being validated (used in the error message)
 * @param required - Whether the field is required or optional (currently not used in validation but can be extended for future use)
 * @returns Zod schema for validating a MongoDB ObjectId
 */
export const objectIdField = (fieldName: string, required: boolean) => {
    required
        ? z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: `The ${fieldName} is not a valid ObjectId`,
        })
        : z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: `The ${fieldName} is not a valid ObjectId`,
        }).optional();
}


/**
 * Helper to create a Zod object schema with multiple ObjectId fields.
 * Each key will be validated as a MongoDB ObjectId and include its name in the error message.
 *
 * @param required - An array of field names that should be validated as ObjectId required fields
 * @param optional - An array of field names that should be validated as ObjectId optional fields
 * @returns Zod object schema containing the specified ObjectId fields
 */
export const createIdParamsSchema = <T extends string[]>(required: T, optional?: T) =>
    z.object(
        Object.fromEntries([
            ...required.map((field) => [field, objectIdField(field, true)]) ,
            ...(optional ? optional.map((field) => [field, objectIdField(field, false)]) : [])
        ]) as Record<
            T[number],
            z.ZodString
        >
    );
