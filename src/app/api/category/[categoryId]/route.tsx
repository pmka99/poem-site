import { connectDB } from "@server/utils/db";
import { createIdParamsSchema } from "@server/validators";
import { protectedRoute } from "@server/guard/protectedRoute";
import { Action, Resource } from "@/enum/permission";
import { errorResponse, successResponse } from "@/server/utils/response";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import CategoryModel from "@/server/models/category";
import { toCategoryResponse } from "@/server/mapper/category.mapper";
import { updateCategorySchema } from "@/shared/schemas/category.schema";

const paramsSchema = createIdParamsSchema(["categoryId"], [])

/** get a category by id */
export const GET = protectedRoute(
    {
        require: [
            { action: Action.READ, resource: Resource.CATEGORY }
        ],
        paramsSchema: paramsSchema
    },
    async (_req, _ctx, { params }) => {
        const { categoryId } = params;
        await connectDB();

        const category = await CategoryModel.findById(categoryId).lean();
        if (!category) {
            return errorResponse({ message: ERRORSMESSAGES.CATEGORY_NOT_FOUND, status: 404 });
        }
        const data = toCategoryResponse(category)

        return successResponse({
            data,
            message: SUCCESSMESSAGES.CATEGORY_FETCHED
        });
    }
);

/** update a category by id */
export const PUT = protectedRoute(
    {
        require: [
            { action: Action.UPDATE, resource: Resource.CATEGORY }
        ],
        paramsSchema: paramsSchema,
        bodySchema: updateCategorySchema
    },
    async (_req, _ctx, { params, body }) => {
        const { categoryId } = params;

        await connectDB();

        const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, body, { new: true });
        if (!updatedCategory) {
            return errorResponse({ message: ERRORSMESSAGES.CATEGORY_NOT_FOUND, status: 404 });
        }

        const data = toCategoryResponse(updatedCategory);

        return successResponse({ data, message: SUCCESSMESSAGES.CATEGORY_UPDATED });
    }
);

/** delete a category by id */
export const DELETE = protectedRoute(
    {
        require: [
            { action: Action.DELETE, resource: Resource.CATEGORY }
        ],
        paramsSchema: paramsSchema,
    },
    async (_req, _ctx, { params }) => {
        const { categoryId } = params;
        await connectDB();
        await CategoryModel.findByIdAndDelete(categoryId);
        return successResponse({ message: SUCCESSMESSAGES.CATEGORY_DELETED });
    }
);