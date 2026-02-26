import { ZodTypeAny, infer as zInfer } from "zod";

type ValidationResult<T> =
    | { success: true; data: T }
    | { success: false; error: any };

export async function validateBody<T extends ZodTypeAny>(
    schema: T,
    req: Request
): Promise<ValidationResult<zInfer<T>>> {
    let body: unknown;

    try {
        body = await req.json();
    } catch (err) {
        return {
            success: false,
            error: { message: "بدنه درخواست معتبر نیست" },
        };
    }

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.flatten(), // برای front-end راحت خوانده شود
        };
    }

    return {
        success: true,
        data: parsed.data,
    };
}