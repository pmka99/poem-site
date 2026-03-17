import { NextRequest, NextResponse } from "next/server";
import { z, ZodTypeAny, ZodError } from "zod";
import { accessService } from "../access";
import { PermissionRequirement, AuthorizationMode } from "../access/types";
import { getUserFromRequest, AuthUser } from "../utils/getUserFromRequest";

interface ProtectedRouteConfig<
    B extends ZodTypeAny | undefined = undefined,
    P extends ZodTypeAny | undefined = undefined,
    Q extends ZodTypeAny | undefined = undefined
> {
    require: PermissionRequirement[];
    mode?: AuthorizationMode;
    bodySchema?: B;
    paramsSchema?: P;
    querySchema?: Q;
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

export function protectedRoute<
    B extends ZodTypeAny | undefined = undefined,
    P extends ZodTypeAny | undefined = undefined,
    Q extends ZodTypeAny | undefined = undefined
>(
    config: ProtectedRouteConfig<B, P, Q>,
    handler: (
        req: NextRequest,
        ctx: { params?: Promise<any> },
        data: RouteData<B, P, Q>,
        user: AuthUser
    ) => Promise<Response>
) {
    return async (req: NextRequest, ctx: { params?: Promise<any> }) => {
        try {
            // Authentication
            const user = await getUserFromRequest(req);

            if (!user) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            // Resolve params (Next.js 15)
            const rawParams = ctx?.params ? await ctx.params : {};

            // Body validation
            let body: any = undefined;
            if (config.bodySchema) {
                const json = await req.json();
                body = config.bodySchema.parse(json);
            }

            // Params validation
            let params: any = undefined;
            if (config.paramsSchema) {
                params = config.paramsSchema.parse(rawParams ?? {});
            }

            // Query validation
            let query: any = undefined;
            if (config.querySchema) {
                const rawQuery = Object.fromEntries(req.nextUrl.searchParams.entries());
                query = config.querySchema.parse(rawQuery);
            }

            const data: RouteData<B, P, Q> = {
                body,
                params,
                query,
            };

            // Authorization
            const allowed = await accessService.canAccess(
                user,
                config.require,
                {
                    body,
                    params: params ?? rawParams,
                    query,
                },
                config.mode ?? "AND"
            );

            if (!allowed) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }

            // Run handler
            return handler(req, { params: rawParams }, data, user);
        } catch (err) {
            if (err instanceof ZodError) {
                return NextResponse.json(
                    {
                        error: "Validation failed",
                        issues: err.issues,
                    },
                    { status: 400 }
                );
            }

            console.error(err);

            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 }
            );
        }
    };
}
