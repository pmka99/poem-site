
import { connectDB } from "@/server/utils/db";
import { NextResponse } from 'next/server';
import HemistichModel from "@/server/models/hemistich";
import { validateBody, validateId } from "@/server/validators";
import { updateHemistichSchema } from "@/schemas/hemistich.schema";
import { createIdParamsSchema } from "@/server/validators/createIdParamsSchema";

const zz = createIdParamsSchema("id")
type RouteContext = { params: { id: string } }

const collectionName = "مصرع";

/** get a hemistich by id */


export async function GET(ctx: RouteContext) {
    const { id } = ctx.params;
    validateId(id, collectionName);
    await connectDB();

    const hemistich = await HemistichModel.findById(id).lean();

    if (!hemistich) {
        return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
    }

    return NextResponse.json(hemistich);
}

/** update a hemistich by id */
export async function PUT(request: Request, ctx: RouteContext) {
    const { id } = ctx.params;
    const hemistich = await request.json();

    // validation
    validateId(id, collectionName);
    validateBody(updateHemistichSchema, hemistich);

    await connectDB();

    const updatedHemistich = await HemistichModel.findByIdAndUpdate(
        id,
        hemistich,
        { new: true }
    );

    if (!updatedHemistich) {
        return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
    }

    return NextResponse.json(updatedHemistich);
}

/** delete a hemistich by id */
export async function DELETE(ctx: RouteContext) {
    const { id } = ctx.params;

    // validation
    validateId(id, collectionName);

    await connectDB();

    const deletedHemistich = await HemistichModel.findByIdAndDelete(id);

    if (!deletedHemistich) {
        return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Hemistich deleted successfully" });
}