import { z } from "zod";
import { objectIdSchema } from "./common/object-id.schema";

export const createStorySchema = z.object({
    text: z.array(z.string().min(1, "متن الزامی است")),
    poem: objectIdSchema
});

export const updateStorySchema = createStorySchema.partial();

