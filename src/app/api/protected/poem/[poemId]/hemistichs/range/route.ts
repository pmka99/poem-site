import { Action, Resource } from "@/enum/permission";
import { protectedRoute } from "@/server/guard/protectedRoute";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import HemistichModel from "@/server/models/hemistich";
import { connectDB } from "@/server/utils/db";
import { errorResponse, successResponse } from "@/server/utils/response";
import { createIdParamsSchema } from "@/server/validators";
import { deleteRangeHemistichSchema } from "@/shared/schemas/hemistich.schema";

const paramsSchema = createIdParamsSchema(["poemId"], [])


/** delete a hemistich by id */
export const DELETE = protectedRoute(
    {
        require: [
            { action: Action.DELETE, resource: Resource.HEMISTICH },
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
        bodySchema: deleteRangeHemistichSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemId } = params;
        const { firstOrder, lastOrder } = body.range;
        
        await connectDB();

        await HemistichModel.deleteMany({
            poem: poemId,
            order: {
                $gte: firstOrder,
                $lte: lastOrder
            }
        });

        return successResponse({ message: SUCCESSMESSAGES.HEMISTICH_DELETED });
    }
)