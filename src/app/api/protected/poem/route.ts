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

// ✅ Schema for query params (GET)
const queryParamsSchema = createIdParamsSchema([], ["page", "limit", "author", "poemType", "text"])

// GET /poems
export const GET = protectedRoute(
    {
        require: [
            { action: Action.READ, resource: Resource.POEM }
        ],
        querySchema: queryParamsSchema,
    },
    async (_req, _ctx, { query }) => {
        await connectDB();

        const page = parseInt(query.page ?? "1");
        const limit = parseInt(query.limit ?? "10");
        const author = query.author;
        const poemType = query.poemType;
        const text = query.text;

        // const resultOfStories = await PoemModel.find({
        //     story: { $regex: text ?? "", $options: "i" },
        // }).select("_id");

        // const resultOfStoriesIds = resultOfStories.map((poem) => poem._id);

        const filter: any = {};
        // if (author) filter.author = author;
        // if (poemType) filter.poemType = poemType;
        // if (text) filter._id = { $in: resultOfStoriesIds };

        const result = await PoemModel.paginate(filter, {
            limit,
            page,
            populate: ["poemType", "author"],
            lean: true,
        });

        const data = result.docs.map(toPoemResponse)

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