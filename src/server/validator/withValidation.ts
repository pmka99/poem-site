import { NextResponse } from "next/server";
import { validateBody } from "./validateBody";
import { ZodTypeAny } from "zod";
import zod from "zod";

type RouteOptions<T extends ZodTypeAny> = {
    bodySchema?: T;
    requireAuth?: boolean;
};

export function createRoute<T extends ZodTypeAny>(
    options: RouteOptions<T>,
    handler: (
        req: Request,
        ctx: any,
        data: T extends ZodTypeAny ? zod.infer<T> : undefined
    ) => Promise<Response>
) {
    return async (req: Request, ctx: any) => {
        try {
            let validatedData: any = undefined;

            if (options.bodySchema) {
                const result = await validateBody(options.bodySchema, req);
                if (!result.success) {
                    return NextResponse.json(
                        { error: result.error },
                        { status: 400 }
                    );
                }
                validatedData = result.data;
            }

            return await handler(req, ctx, validatedData);
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "خطا در پردازش درخواست" },
                { status: 500 }
            );
        }
    };
}