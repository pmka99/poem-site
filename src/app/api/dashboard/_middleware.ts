import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../../server/guard/utils/getUserIdFromRequest";

/**
 * Central Auth Middleware for all /dashboard routes
 */
export function middleware(req: NextRequest) {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = NextResponse.next();
    res.headers.set("x-user-id", userId); // optionally pass userId to downstream route
    return res;
}