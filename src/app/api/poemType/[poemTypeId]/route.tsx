import { connectDB } from "@server/utils/db";
import { NextResponse } from 'next/server';
import { createIdParamsSchema } from "@server/validators";
import { protectedRoute } from "@server/guard/protectedRoute";
import { Action, Resource } from "@/enum/permission";
import PoemTypeModel from "@/server/models/poemType";
import { updatePoemTypeSchema } from "@/shared/schemas/poemType.schema";
import { errorResponse, successResponse } from "@/server/utils/response";
import { toPoemTypeResponse } from "@/server/mapper/poemType.mapper";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import "@/server/models"

const paramsSchema = createIdParamsSchema(["poemTypeId"], [])

/** get a poem by id */
export const GET = protectedRoute(
    {
        require: [
            { action: Action.READ, resource: Resource.POEM_TYPES }
        ],
        paramsSchema: paramsSchema
    },
    async (_req, _ctx, { params }) => {
        const { poemTypeId } = params;
        await connectDB();

        const poemType = await PoemTypeModel.findById(poemTypeId).lean();
        if (!poemType) {
            return errorResponse({ message: ERRORSMESSAGES.POEM_TYPE_NOT_FOUND, status: 404 });
        }
        const data = toPoemTypeResponse(poemType)

        return successResponse({
            data,
            message: SUCCESSMESSAGES.POEM_TYPE_FETCHED
        });
    }
);

/** update a poem by id */
export const PUT = protectedRoute(
    {
        require: [
            { action: Action.UPDATE, resource: Resource.POEM_TYPES }
        ],
        paramsSchema: paramsSchema,
        bodySchema: updatePoemTypeSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemTypeId } = params;

        await connectDB();

        const updatedPoemType = await PoemTypeModel.findByIdAndUpdate(poemTypeId, body, { new: true });
        if (!updatedPoemType) {
            return errorResponse({ message: ERRORSMESSAGES.POEM_TYPE_NOT_FOUND, status: 404 });
        }

        const data = toPoemTypeResponse(updatedPoemType);

        return successResponse({ data, message: SUCCESSMESSAGES.POEM_TYPE_UPDATED });
    }
);

/** delete a poem by id */
export const DELETE = protectedRoute(
    {
        require: [
            { action: Action.DELETE, resource: Resource.POEM_TYPES }
        ],
        paramsSchema: paramsSchema,
    },
    async (_req, _ctx, { params }) => {
        const { poemTypeId } = params;
        await connectDB();
        await PoemTypeModel.findByIdAndDelete(poemTypeId);
        return successResponse({ message: SUCCESSMESSAGES.POEM_TYPE_DELETED });
    }
);