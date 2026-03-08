import { createHemistichSchema, updateHemistichSchema } from "@/shared/schemas/hemistich.schema";
import { z } from "zod";

export type CreateHemistichDTO = z.infer<typeof createHemistichSchema>;
export type UpdateHemistichDTO = z.infer<typeof updateHemistichSchema>;