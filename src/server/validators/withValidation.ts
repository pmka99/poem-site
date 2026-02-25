import { NextResponse } from "next/server";
import { ZodTypeAny, infer as zInfer } from "zod";
import { validateBody } from "./validateBody";
import { validateParams } from "./validateParams";

type WithValidationOptions<
    B extends ZodTypeAny | undefined,
    P extends ZodTypeAny | undefined
> = {
    bodySchema?: B;
    paramsSchema?: P;
};

export function withValidation<
    B extends ZodTypeAny | undefined,
    P extends ZodTypeAny | undefined
>(
    options: WithValidationOptions<B, P>,
    handler: (
        req: Request,
        ctx: any,
        data: {
            body: B extends ZodTypeAny ? zInfer<B> : undefined;
            params: P extends ZodTypeAny ? zInfer<P> : undefined;
        }
    ) => Promise<Response>
) {
    return async (req: Request, ctx: any) => {
        try {
            let validatedBody: any = undefined;
            let validatedParams: any = undefined;

            // validate body
            if (options.bodySchema) {
                const result = await validateBody(options.bodySchema, req);

                if (!result.success) {
                    return NextResponse.json({ error: result.error }, { status: 400 });
                }

                validatedBody = result.data;
            }

            // validate params
            if (options.paramsSchema) {
                const result = validateParams(
                    options.paramsSchema,
                    ctx.params
                );

                if (!result.success) {
                    return NextResponse.json({ error: result.error }, { status: 400 });
                }

                validatedParams = result.data;
            }

            return await handler(req, ctx, {
                body: validatedBody,
                params: validatedParams,
            });
        } catch (error) {
            console.error(error);

            return NextResponse.json(
                { error: "خطا در پردازش درخواست" },
                { status: 500 }
            );
        }
    };
}