
import { Action, Resource } from "@/enum/permission";
import { Position } from "@/enum/poem";
import { protectedRoute } from "@/server/guard/protectedRoute";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import HemistichModel from "@/server/models/hemistich";
import { connectDB } from "@/server/utils/db";
import { rebalanceHemistichOrders } from "@/server/utils/rebalancerHemistichOrder";
import { errorResponse, successResponse } from "@/server/utils/response";
import { createIdParamsSchema } from "@/server/validators";
import { moveRangeHemistichSchema } from "@/shared/schemas/hemistich.schema";
import "@/server/models"

const paramsSchema = createIdParamsSchema(["poemId"], [])

export const PUT = protectedRoute(
    {
        require: [
            { action: Action.UPDATE, resource: Resource.HEMISTICH },
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
        bodySchema: moveRangeHemistichSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemId } = params;
        const { range: { firstOrder, lastOrder }, targetHemistichId, position } = body;

        await connectDB();

        const rangeDocs = await HemistichModel
            .find({
                poem: poemId,
                order: { $gte: firstOrder, $lte: lastOrder }
            })
            .sort({ order: 1 });

        const count = rangeDocs.length;

        const target = await HemistichModel
            .findById(targetHemistichId)
            .lean();

        if (!target) {
            return errorResponse({ message: ERRORSMESSAGES.HEMISTICH_NOT_FOUND });
        }

        let prevOrder: number;
        let nextOrder: number;

        // BEFORE
        if (position === Position.before) {

            const prev = await HemistichModel
                .findOne({
                    poem: poemId,
                    order: { $lt: target.order }
                })
                .sort({ order: -1 })
                .lean();

            prevOrder = prev ? prev.order : target.order - 1000;
            nextOrder = target.order;
        }

        // AFTER
        else if (position === Position.after) {

            const next = await HemistichModel
                .findOne({
                    poem: poemId,
                    order: { $gt: target.order }
                })
                .sort({ order: 1 })
                .lean();

            prevOrder = target.order;
            nextOrder = next ? next.order : target.order + 1000;
        } else {
            return errorResponse({ message: ERRORSMESSAGES.VALIDATION_ERROR });
        }

        const gap = nextOrder - prevOrder;
        const step = gap / (count + 1);

        let current = prevOrder + step;

        for (const doc of rangeDocs) {
            await HemistichModel.updateOne(
                { _id: doc._id },
                { $set: { order: current } }
            );
            current += step;
        }

        if (step < 1) {
            await rebalanceHemistichOrders(poemId);
        }


        return successResponse({ message: SUCCESSMESSAGES.HEMISTICH_UPDATED });
    }
)