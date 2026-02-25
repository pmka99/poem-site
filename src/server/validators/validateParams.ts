import { ZodTypeAny, infer as zInfer } from "zod";

type ParamsValidationResult<T> =
    | { success: true; data: T }
    | { success: false; error: any };

export function validateParams<T extends ZodTypeAny>(
    schema: T,
    params: unknown
): ParamsValidationResult<zInfer<T>> {
    const parsed = schema.safeParse(params);

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.flatten(),
        };
    }

    return {
        success: true,
        data: parsed.data,
    };
}