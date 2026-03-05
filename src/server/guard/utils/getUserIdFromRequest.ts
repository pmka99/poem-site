import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**
 * Auth middleware to extract userId from Authorization header
 * @param req - NextRequest
 * @returns userId string or null if unauthorized
 */
export function getUserIdFromRequest(req: NextRequest): string | null {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        return payload.userId;
    } catch {
        return null;
    }
}