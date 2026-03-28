import { connectDB } from "@server/utils/db";
import PoemModel, { IPoem } from "@server/models/poem";
import { NextResponse } from "next/server";
import { protectedRoute } from "@server/guard/protectedRoute";
import { createPoemSchema } from "@shared/schemas/poem.schema";
import { createIdParamsSchema } from "@server/validators";
import { Action, Resource } from "@/enum/permission";
import { successResponse } from "@/server/utils/response";
import { toPoemResponse } from "@/server/mapper/poem.mapper";
import { SUCCESSMESSAGES } from "@/server/messages";
import { publicRoute } from "@/server/guard/publicRoute";
import { getPoemPopulate, getPoemReadFilter } from "@/server/guard/access/policies/poem.policy";
import "@/server/models"
import mongoose from "mongoose";

// ✅ Schema for query params (GET)
const queryParamsSchema = createIdParamsSchema([], ["page", "limit", "author", "poemType", "search"])

// GET /poems
export const GET = publicRoute(
    {
        querySchema: queryParamsSchema,
    },
    async (_req, _ctx, { query }, user) => {
        await connectDB();

        const page = parseInt(query.page ?? "1");
        const limit = parseInt(query.limit ?? "20");

        const visibilityFilter = getPoemReadFilter(user);
        const populate = getPoemPopulate(user);

        const filter: mongoose.QueryFilter<IPoem> = {
            ...visibilityFilter,
        };

        if (query.search) {
            const s = query.search.trim();

            filter.$or = [
                { title: { $regex: s, $options: "i" } },
                { story: { $regex: s, $options: "i" } },
            ];
        }

        const result = await PoemModel.paginate(filter, {
            limit,
            page,
            populate,
            lean: true,
            sort: { order: 1 }
        });

        const data = result.docs.map(toPoemResponse);

        return successResponse({
            message: SUCCESSMESSAGES.POEMS_FETCHED,
            data,
            meta: {
                page: result.page,
                limit: result.limit,
                total: result.totalDocs,
                totalPage: result.totalPages
            }
        });
    }
);

// POST /poems
export const POST = protectedRoute(
    {
        require: [
            { action: Action.CREATE, resource: Resource.POEM }
        ],
        bodySchema: createPoemSchema,
    },
    async (_req, _ctx, { body }) => {
        await connectDB();

        const newPoem = await PoemModel.create(body);

        const data = toPoemResponse(newPoem)

        return successResponse({ data, message: SUCCESSMESSAGES.POEM_CREATED });
    }
);