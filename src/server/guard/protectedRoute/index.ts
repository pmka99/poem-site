import { NextRequest, NextResponse } from "next/server";
import { withValidation } from "@server/validators/withValidation";
import { checkPermission } from "@server/guard/rbac"; 
import { getUserIdFromRequest } from "@server/guard/utils/getUserIdFromRequest";

/**
 * Wrapper for protected routes
 * - Validates body & params with Zod
 * - Checks user permission
 * - Optionally checks ownership
 */
export function protectedRoute<B, P>(
    permissionName: string,
    options: { bodySchema?: B; paramsSchema?: P },
    handler: (req: NextRequest, ctx: any, data: any, userId: string) => Promise<Response>,
) {
    return withValidation(options, async (req: NextRequest, ctx, data) => {
        // extract userId from auth (JWT / session)
        const userId = getUserIdFromRequest(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // check permission
        const hasPermission = await checkPermission(userId, permissionName);
        if (!hasPermission) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // call the actual handler
        return handler(req, ctx, data, userId);
    });
}