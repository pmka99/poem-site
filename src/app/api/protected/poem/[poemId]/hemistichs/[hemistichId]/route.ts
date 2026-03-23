
import { connectDB } from "@server/utils/db";
import { NextResponse } from 'next/server';
import HemistichModel from "@server/models/hemistich";
import { updateHemistichSchema } from "@shared/schemas/hemistich.schema";
import { createIdParamsSchema } from "@server/validators/createIdParamsSchema";
import { protectedRoute } from "@server/guard/protectedRoute";
import { Action, Resource } from "@/enum/permission";

const paramsSchema = createIdParamsSchema(["hemistichId", "poemId"], [])

/** get a hemistich by id */
export const GET = protectedRoute(
    {
        require: [
            { action: Action.READ, resource: Resource.HEMISTICH },
            { action: Action.READ, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema
    },
    async (_req, _ctx, { params }) => {
        const { hemistichId } = params;
        await connectDB();

        const hemistich = await HemistichModel.findById(hemistichId).lean();

        if (!hemistich) {
            return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
        }
        return NextResponse.json({ data: hemistich });
    }
)

/** update a hemistich by id */
export const PUT = protectedRoute(
    {
        require: [
            { action: Action.UPDATE, resource: Resource.HEMISTICH },
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
        bodySchema: updateHemistichSchema
    },
    async (request: Request, _ctx, { params, body }) => {
        const { hemistichId } = params;
        await connectDB();
        const updatedHemistich = await HemistichModel.findByIdAndUpdate(
            hemistichId,
            body,
            { new: true }
        );

        if (!updatedHemistich) {
            return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
        }

        return NextResponse.json({ data: updatedHemistich });
    }
)

/** delete a hemistich by id */
export const DELETE = protectedRoute(
    {
        require: [
            { action: Action.DELETE, resource: Resource.HEMISTICH },
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema
    },
    async (_req, _ctx, { params }) => {
        const { hemistichId } = params;
        await connectDB();

        const deletedHemistich = await HemistichModel.findByIdAndDelete(hemistichId);

        if (!deletedHemistich) {
            return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Hemistich deleted successfully" });
    }
)