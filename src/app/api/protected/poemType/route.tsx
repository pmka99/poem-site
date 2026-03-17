import { Action, Resource } from "@/enum/permission";
import { protectedRoute } from "@/server/guard/protectedRoute";
import { errorResponse, successResponse } from "@/server/utils/response";
import { createPoemTypeSchema } from "@/shared/schemas/poemType.schema";
import PoemTypesModel from "@/server/models/poemType";
import { connectDB } from "@server/utils/db";
import { toPoemTypeResponse } from "@/server/transformers/poemType.transformer";

// GET all poem types
export const GET = protectedRoute(
    {
        require: [{ action: Action.READ, resource: Resource.POEM_TYPES }],
    },
    async (_req, _ctx) => {
        await connectDB();

        const poemTypes = await PoemTypesModel.find().lean();

        const data = poemTypes.map(toPoemTypeResponse)

        return successResponse({
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

        try {
            await connectDB();

            const newPoemType = await PoemTypesModel.create(body);

            // ✳️ اصلاح این خط:
            const data = toPoemTypeResponse(newPoemType);

            return successResponse({
                data,
                status: 201,
            });
        } catch (error) {
            console.error(error);

            return errorResponse({ message: "ssss", status: 500 })


        }

    }
);

