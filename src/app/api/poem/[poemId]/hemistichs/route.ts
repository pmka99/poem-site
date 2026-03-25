import { createHemistichSchema } from "@shared/schemas/hemistich.schema";
import { protectedRoute } from "@server/guard/protectedRoute";
import HemistichModel, { IHemistich } from "@server/models/hemistich";
import { connectDB } from "@server/utils/db";
import { createIdParamsSchema } from "@server/validators";
import { errorResponse, successResponse } from "@/server/utils/response";
import { Action, Resource } from "@/enum/permission";
import { ERRORSMESSAGES, SUCCESSMESSAGES } from "@/server/messages";
import { Position } from "@/enum/poem";
import PoemModel from "@/server/models/poem";
import { rebalanceHemistichOrders } from "@/server/utils/rebalancerHemistichOrder";
import { publicRoute } from "@/server/guard/publicRoute";


const paramsSchema = createIdParamsSchema(["poemId"], [])
const queryParamsSchema = createIdParamsSchema([], ["page", "limit", "text"])

/** get all hemistichs of a poem */
export const GET = publicRoute(
    {
        paramsSchema: paramsSchema,
        querySchema: queryParamsSchema
    },
    async (_req, _ctx, { params, query }) => {
        const { poemId } = params;
        await connectDB();
        const page = parseInt(query.page ?? "1");
        const limit = parseInt(query.limit ?? "10");
        const text = query.text;

        const filter: any = { poem: poemId };
        if (text) filter.text = { $regex: text, $options: "i" };

        const result = await HemistichModel.paginate(filter,
            { limit, page, lean: true, sort: { order: 1 } });
        const hemistichs: IHemistich[] = result.docs;

        return successResponse({
            meta: {
                page: result.page,
                limit: result.limit,
                total: result.totalDocs,
                totalPage: result.totalPages
            },
            data: hemistichs,
            message: SUCCESSMESSAGES.DATA_FETCHED
        });
    }
)

/** add a hemistich to a poem */
/* check if poem exists */
export const POST = protectedRoute(
    {
        require: [
            { action: Action.CREATE, resource: Resource.HEMISTICH },
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema,
        bodySchema: createHemistichSchema
    },
    async (_req, _ctx, { params, body }) => {

        const { poemId } = params;
        await connectDB();

        const poemExists = await PoemModel.exists({ _id: poemId });
        if (!poemExists) {
            return errorResponse({ message: ERRORSMESSAGES.POEM_NOT_FOUND, status: 404 });
        }

        let order: number | null = null;
        let gap: number | null = null;

        // FIRST
        if (body.position === Position.first) {

            const first = await HemistichModel
                .findOne({ poem: poemId })
                .sort({ order: 1 })
                .lean();

            order = first ? first.order - 1000 : 10000;
        }

        // BEFORE
        else if (body.position === Position.before && body.targetHemistichId) {

            const target = await HemistichModel
                .findById(body.targetHemistichId)
                .lean();

            if (!target) {
                return errorResponse({ message: ERRORSMESSAGES.HEMISTICH_NOT_FOUND });
            }

            const prev = await HemistichModel
                .findOne({
                    poem: poemId,
                    order: { $lt: target.order }
                })
                .sort({ order: -1 })
                .lean();

            const prevOrder = prev ? prev.order : target.order - 1000;
            gap = target.order - prevOrder;

            order = prev ? (prevOrder + target.order) / 2 : prevOrder;
        }

        // AFTER
        else if (body.position === Position.after && body.targetHemistichId) {

            const target = await HemistichModel
                .findById(body.targetHemistichId)
                .lean();

            if (!target) {
                return errorResponse({ message: ERRORSMESSAGES.HEMISTICH_NOT_FOUND });
            }

            const next = await HemistichModel
                .findOne({
                    poem: poemId,
                    order: { $gt: target.order }
                })
                .sort({ order: 1 })
                .lean();

            const nextOrder = next ? next.order : target.order + 1000;
            gap = nextOrder - target.order;

            order = next ? (target.order + nextOrder) / 2 : nextOrder;
        }

        else {
            return errorResponse({ message: ERRORSMESSAGES.VALIDATION_ERROR });
        }

        const newHemistich = await HemistichModel.create({
            poem: poemId,
            text: body.text,
            show: body.show,
            order
        });

        if (gap !== null && gap < 1) {
            await rebalanceHemistichOrders(poemId);
        }

        return successResponse({
            data: newHemistich,
            message: SUCCESSMESSAGES.HEMISTICH_CREATED
        });
    });



/** delete all hemistichs of a poem */
export const DELETE = protectedRoute(
    {
        require: [
            { action: Action.DELETE, resource: Resource.HEMISTICH },
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
    },
    async (_req, _ctx, { params }) => {
        const { poemId } = params;
        await connectDB();
        await HemistichModel.deleteMany({ poem: poemId });
        return successResponse({ message: SUCCESSMESSAGES.HEMISTICH_DELETED });
    }
)
