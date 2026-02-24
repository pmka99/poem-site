import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createAuthorSchema = z.object({
    userId: objectIdSchema,
    fullName: z.string().min(1, "نام کامل الزامی است"),
    description: z.string().optional(),
});

export const updateAuthorSchema = createAuthorSchema.partial();

export type CreateAuthorDTO = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorDTO = z.infer<typeof updateAuthorSchema>;