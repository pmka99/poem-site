import { Action, Resource } from "@/enum/permission";
import { protectedRoute } from "@/server/guard/protectedRoute";
import { successResponse } from "@/server/utils/response";
import { connectDB } from "@server/utils/db";
import { SUCCESSMESSAGES } from "@/server/messages";
import { publicRoute } from "@/server/guard/publicRoute";
import { toCategoryResponse } from "@/server/mapper/category.mapper";
import CategoryModel from "@/server/models/category";
import { createCategorySchema } from "@/shared/schemas/category.schema";

// GET all categories
export const GET = publicRoute(
    {}, async (_req, _ctx) => {
        await connectDB();

        const categories = await CategoryModel.find().lean();

        const data = categories.map(toCategoryResponse)

        return successResponse({
            message: SUCCESSMESSAGES.CATEGORY_FETCHED,
            data,
        });
    }
);

/** add a new categorie */
export const POST = protectedRoute(
    {
        require: [{ action: Action.CREATE, resource: Resource.CATEGORY }],
        bodySchema: createCategorySchema,
    },
    async (_req, _ctx, { body }) => {
        await connectDB();

        const newCategory = await CategoryModel.create(body);

        const data = toCategoryResponse(newCategory);

        return successResponse({
            message: SUCCESSMESSAGES.CATEGORY_CREATED,
            data,
            status: 201,
        });
    }
);

