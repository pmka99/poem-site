import { connectDB } from "../../../../../server/utils/db";
import PoemModel, { IPoem } from "../../../../../server/models/poem";
import { NextResponse } from "next/server";
import { protectedRoute } from "../../../../../server/guard/protectedRoute";
import { createPoemSchema } from "../../../../../server/schemas/poem.schema";
import { createIdParamsSchema } from "../../../../../server/validators";

// ✅ Schema for query params (GET)
const queryParamsSchema = createIdParamsSchema([], ["page", "limit", "author", "poemType", "text"])

// GET /poems
export const GET = protectedRoute(
    {
        require: [{ action: "read", resource: "poem" }],
        querySchema: queryParamsSchema,
    },
    async (_req, _ctx, { query }) => {
        await connectDB();

        const page = parseInt(query.page ?? "1");
        const limit = parseInt(query.limit ?? "10");
        const author = query.author;
        const poemType = query.poemType;
        const text = query.text;

        // search for hemistichs that match the text and get their poem IDs
        const resultOfHemistich = await PoemModel.find({
            story: { $regex: text ?? "", $options: "i" },
        }).select("_id");

        const hemistichIds = resultOfHemistich.map((poem) => poem._id);

        const filter: any = {};
        if (author) filter.author = author;
        if (poemType) filter.poemType = poemType;
        if (text) filter._id = { $in: hemistichIds };

        const result = await PoemModel.paginate(filter, {
            limit,
            page,
            populate: ["author", "poemType"],
            lean: true,
        });

        return NextResponse.json({ data: result.docs });
    }
);

// POST /poems
export const POST = protectedRoute(
    {
        require: [{ action: "create", resource: "poem" }],
        bodySchema: createPoemSchema,
    },
    async (_req, _ctx, { body }) => {
        await connectDB();

        const newPoem: IPoem = await PoemModel.create(body);

        return NextResponse.json({ data: newPoem });
    }
);