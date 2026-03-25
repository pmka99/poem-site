import { NextRequest } from "next/server";
import { z, ZodTypeAny, ZodError } from "zod";
import { getUserFromRequest, AuthUser } from "../utils/getUserFromRequest";
import { ERRORSMESSAGES } from "@/server/messages";
import { errorResponse } from "@/server/utils/response";

interface PublicRouteConfig<
    B extends ZodTypeAny | undefined = undefined,
    P extends ZodTypeAny | undefined = undefined,
    Q extends ZodTypeAny | undefined = undefined
> {
    bodySchema?: B;
    paramsSchema?: P;
    querySchema?: Q;
    allowGuest?: boolean; // default true
}

type InferOrUndefined<T extends ZodTypeAny | undefined> =
    T extends ZodTypeAny ? z.infer<T> : undefined;

type RouteData<
    B extends ZodTypeAny | undefined,
    P extends ZodTypeAny | undefined,
    Q extends ZodTypeAny | undefined
> = {
    body: InferOrUndefined<B>;
    params: InferOrUndefined<P>;
    query: InferOrUndefined<Q>;
};

export function publicRoute<
    B extends ZodTypeAny | undefined = undefined,
    P extends ZodTypeAny | undefined = undefined,
    Q extends ZodTypeAny | undefined = undefined
>(
    config: PublicRouteConfig<B, P, Q>,
    handler: (
        req: NextRequest,
        ctx: { params?: Promise<any> },
        data: RouteData<B, P, Q>,
        user: AuthUser | null
    ) => Promise<Response>
) {
    return async (req: NextRequest, ctx: { params?: Promise<any> }) => {
        try {

            const rawParams = ctx?.params ? await ctx.params : {};

            let body: any = undefined;
            if (config.bodySchema) {
                const json = await req.json();
                body = config.bodySchema.parse(json);
            }

            let params: any = undefined;
            if (config.paramsSchema) {
                params = config.paramsSchema.parse(rawParams ?? {});
            }

            let query: any = undefined;
            if (config.querySchema) {
                const rawQuery = Object.fromEntries(req.nextUrl.searchParams.entries());
                query = config.querySchema.parse(rawQuery);
            }

            const data = { body, params, query };

            // optional auth
            let user: AuthUser | null = null;
            try {
                user = await getUserFromRequest(req);
            } catch { }

            return handler(req, { params: rawParams }, data, user);

        } catch (err) {
            if (err instanceof ZodError) {
                return errorResponse({
                    message: ERRORSMESSAGES.VALIDATION_ERROR,
                    errors: err.issues,
                    status: 400
                });
            }

            console.error(err);

            return errorResponse({
                message: ERRORSMESSAGES.INTERNAL_SERVER_ERROR,
                status: 500
            });
        }
    };
}
