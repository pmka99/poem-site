
import { connectDB } from "@server/utils/db";
import { NextResponse } from 'next/server';
import HemistichModel from "@server/models/hemistich";
import { updateHemistichSchema } from "@shared/schemas/hemistich.schema";
import { createIdParamsSchema } from "@server/validators/createIdParamsSchema";
import { protectedRoute } from "@server/guard/protectedRoute";
import { Action, Resource } from "@/enum/permission";
import { errorResponse, successResponse } from "@/server/utils/response";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import "@/server/models"

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
            return errorResponse({ message: ERRORSMESSAGES.HEMISTICH_NOT_FOUND, status: 404 });
        }
        return successResponse({ data: hemistich, message: SUCCESSMESSAGES.HEMISTICH_FETCHED });
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
    async (_req, _ctx, { params, body }) => {
        const { hemistichId } = params;
        await connectDB();
        const updatedHemistich = await HemistichModel.findByIdAndUpdate(
            hemistichId,
            body,
            { new: true }
        );

        if (!updatedHemistich) {
            return errorResponse({ message: ERRORSMESSAGES.HEMISTICH_NOT_FOUND, status: 404 });
        }

        return successResponse({ message: SUCCESSMESSAGES.HEMISTICH_UPDATED, data: updatedHemistich });
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
            return errorResponse({ message: ERRORSMESSAGES.HEMISTICH_NOT_FOUND, status: 404 });
        }
        return successResponse({ message: SUCCESSMESSAGES.HEMISTICH_DELETED });
    }
)