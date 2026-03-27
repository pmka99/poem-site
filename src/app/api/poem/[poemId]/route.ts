import { connectDB } from "@server/utils/db";
import PoemModel, { IPoem } from "@server/models/poem";
import { NextResponse } from 'next/server';
import { createIdParamsSchema } from "@server/validators";
import { updatePoemSchema } from "@shared/schemas/poem.schema";
import { protectedRoute } from "@server/guard/protectedRoute";
import { Action, Resource } from "@/enum/permission";
import { toPoemResponse } from "@/server/mapper/poem.mapper";
import { errorResponse, successResponse } from "@/server/utils/response";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import { publicRoute } from "@/server/guard/publicRoute";
import { getPoemPopulate, getPoemReadFilter } from "@/server/guard/access/policies/poem.policy";

const paramsSchema = createIdParamsSchema(["poemId"], [])

/** get a poem by id */
export const GET = publicRoute(
    {
        paramsSchema: paramsSchema
    },
    async (_req, _ctx, { params }, user) => {
        const { poemId } = params;
        await connectDB();

        const filter = getPoemReadFilter(user);
        const populate = getPoemPopulate(user);

        const poem = await PoemModel
            .findOne({ _id: poemId, ...filter })
            .populate(populate)
            .lean();
        if (!poem) {
            return errorResponse({ message: ERRORSMESSAGES.POEM_NOT_FOUND, status: 404 });
        }


        const data = toPoemResponse(poem)

        return successResponse({ data, message: SUCCESSMESSAGES.POEM_FETCHED });
    }
);

/** update a poem by id */
export const PUT = protectedRoute(
    {
        require: [
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
        bodySchema: updatePoemSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemId } = params;

        await connectDB();

        const updatedPoem = await PoemModel.findByIdAndUpdate(poemId, body, { new: true });
        if (!updatedPoem) {
            return errorResponse({ message: ERRORSMESSAGES.POEM_NOT_FOUND, status: 404 });
        }
        const data = toPoemResponse(updatedPoem)

        return successResponse({ data, message: SUCCESSMESSAGES.POEM_UPDATED });
    }
);

/** delete a poem by id */
export const DELETE = protectedRoute(
    {
        require: [
            { action: Action.DELETE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
    },
    async (_req, _ctx, { params }) => {
        const { poemId } = params;
        await connectDB();
        await PoemModel.findByIdAndDelete(poemId);
        return successResponse({ message: SUCCESSMESSAGES.POEM_DELETED });
    }
);