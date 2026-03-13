import { Action, Resource } from "@/enum/permission";
import { protectedRoute } from "@/server/guard/protectedRoute";
import { successResponse } from "@/server/utils/response";
import { createPoemTypeSchema } from "@/shared/schemas/poemType.schema";
import PoemTypesModel from "@/server/models/poemType";
import { connectDB } from "@server/utils/db";

// GET all poem types
export const GET = protectedRoute(
    {
        require: [{ action: Action.READ, resource: Resource.POEM_TYPES }],
    },
    async (_req, _ctx) => {
        await connectDB();

        const poemTypes = await PoemTypesModel.find().lean();

        return successResponse({
            data: poemTypes,
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

        return successResponse({
            data: newPoemType,
            status: 201
        });
    }
);

