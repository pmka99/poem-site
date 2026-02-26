import mongoose from "mongoose";
import { NextResponse } from "next/server";

export function validateId(id: string, name = "id") {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
            { error: `شناسه ${name} نامعتبر است` },
            { status: 400 }
        );
    }
}