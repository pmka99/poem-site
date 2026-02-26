import { NextRequest, NextResponse } from "next/server";
import { accessService } from "../access";
import { PermissionRequirement, AuthorizationMode } from "../access/types";
import { AuthUser, getUserFromRequest } from "../utils/getUserFromRequest";
import { z, ZodTypeAny } from "zod";

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

type InferredData<
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
        ctx: { params?: any },
        data: InferredData<B, P, Q>,
        user: AuthUser
    ) => Promise<Response>
) {
    return async (req: NextRequest, ctx: { params?: any }) => {
        // 1️⃣ Authentication
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            // 2️⃣ Validation Phase

            // Body
            let body: any = undefined;
            if (config.bodySchema) {
                const json = await req.json();
                body = config.bodySchema.parse(json);
            }

            // Params
            let params: any = undefined;
            if (config.paramsSchema) {
                params = config.paramsSchema.parse(ctx?.params ?? {});
            }

            // Query
            let query: any = undefined;
            if (config.querySchema) {
                const rawQuery = Object.fromEntries(req.nextUrl.searchParams);
                query = config.querySchema.parse(rawQuery);
            }

            const data: InferredData<B, P, Q> = {
                body,
                params,
                query,
            };

            // 3️⃣ Authorization Context
            const authContext = {
                body,
                params: params ?? ctx?.params ?? {},
                query,
            };

            const allowed = await accessService.canAccess(
                user,
                config.require,
                authContext,
                config.mode ?? "AND"
            );

            if (!allowed) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }

            // 4️⃣ Business Logic
            return handler(req, ctx, data, user);

        } catch (err: any) {
            return NextResponse.json(
                { error: err?.message ?? "Validation failed" },
                { status: 400 }
            );
        }
    };
}