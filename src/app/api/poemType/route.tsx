import { Action, Resource } from "@/enum/permission";
import { protectedRoute } from "@/server/guard/protectedRoute";
import { errorResponse, successResponse } from "@/server/utils/response";
import { createPoemTypeSchema } from "@/shared/schemas/poemType.schema";
import PoemTypesModel from "@/server/models/poemType";
import { connectDB } from "@server/utils/db";
import { toPoemTypeResponse } from "@/server/mapper/poemType.mapper";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import { publicRoute } from "@/server/guard/publicRoute";
import "@/server/models"

// GET all poem types
export const GET = publicRoute(
    {}, async (_req, _ctx) => {
        await connectDB();

        const poemTypes = await PoemTypesModel.find().lean();

        const data = poemTypes.map(toPoemTypeResponse)

        return successResponse({
            message: SUCCESSMESSAGES.POEM_TYPE_FETCHED,
            data,
        });
    }
);

/** add a new poem type */
export const POST = protectedRoute(
    {
        require: [{ action: Action.CREATE, resource: Resource.POEM_TYPES }],
        bodySchema: createPoemTypeSchema,
    },
    async (_req, _ctx, { body }) => {
        await connectDB();

        const newPoemType = await PoemTypesModel.create(body);

        const data = toPoemTypeResponse(newPoemType);

        return successResponse({
            message: SUCCESSMESSAGES.POEM_TYPE_CREATED,
            data,
            status: 201,
        });
    }
);

