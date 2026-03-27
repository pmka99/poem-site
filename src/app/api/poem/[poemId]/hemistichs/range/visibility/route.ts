import { Action, Resource } from "@/enum/permission";
import { protectedRoute } from "@/server/guard/protectedRoute";
import { SUCCESSMESSAGES } from "@/server/messages";
import HemistichModel from "@/server/models/hemistich";
import { connectDB } from "@/server/utils/db";
import { successResponse } from "@/server/utils/response";
import { createIdParamsSchema } from "@/server/validators";
import { visibiltyRangeHemistichSchema } from "@/shared/schemas/hemistich.schema";
import "@/server/models"

const paramsSchema = createIdParamsSchema(["poemId"], [])

export const PUT = protectedRoute(
    {
        require: [
            { action: Action.UPDATE, resource: Resource.HEMISTICH },
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
        bodySchema: visibiltyRangeHemistichSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemId } = params;
        const { range: { firstOrder, lastOrder }, show } = body;
        await connectDB();

        await HemistichModel.updateMany(
            {
                poem: poemId,
                order: {
                    $gte: firstOrder,
                    $lte: lastOrder
                }
            },
            {
                $set: { show }
            }
        );

        return successResponse({ message: SUCCESSMESSAGES.HEMISTICH_UPDATED });
    }
)