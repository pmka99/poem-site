import { createHemistichSchema } from "../../../../../../../server/schemas/hemistich.schema";
import { protectedRoute } from "../../../../../../../server/guard/protectedRoute";
import HemistichModel, { IHemistich } from "../../../../../../../server/models/hemistich";
import { connectDB } from "../../../../../../../server/utils/db";
import { createIdParamsSchema } from "../../../../../../../server/validators";
import { NextResponse } from "next/server";


const paramsSchema = createIdParamsSchema(["poemId"], [])
const queryParamsSchema = createIdParamsSchema([], ["page", "limit", "text"])

/** get all hemistichs of a poem */
export const GET = protectedRoute(
    {
        require: [{ action: "read", resource: "hemistich" }],
        paramsSchema: paramsSchema,
        querySchema: queryParamsSchema
    },
    async (_req, _ctx, { params, query }) => {
        const { poemId } = params;
        await connectDB();
        const page = parseInt(query.page ?? "1");
        const limit = parseInt(query.limit ?? "10");
        const text = query.text;

        const filter: any = { poemId };
        if (text) filter.text = { $regex: text, $options: "i" };

        await connectDB();

        const result = await HemistichModel.paginate(filter,
            { limit, page, populate: ["author", "poemType"], lean: true });
        const hemistichs: IHemistich[] = result.docs;

        return NextResponse.json({ data: hemistichs });
    }
)

/** add a hemistich to a poem */
/* check if poem exists */
export const POST = protectedRoute(
    {
        require: [{ action: "create", resource: "hemistich" }],
        paramsSchema: paramsSchema,
        bodySchema: createHemistichSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemId } = params;
        await connectDB();
        const poemExists = await HemistichModel.exists({ poemId });
        if (!poemExists) {
            return NextResponse.json({ error: "Poem not found" }, { status: 404 });
        }
        const newHemistich: IHemistich = await HemistichModel.create(
            body
        );
        return NextResponse.json({ data: newHemistich });
    }
)

/** delete all hemistichs of a poem */
export const DELETE = protectedRoute(
    {
        require: [{ action: "delete", resource: "hemistich" }],
        paramsSchema: paramsSchema,
    },
    async (_req, _ctx, { params }) => {
        const { poemId } = params;
        await connectDB();
        await HemistichModel.deleteMany({ poemId });
        return NextResponse.json({ message: "Hemistichs deleted successfully" });
    }
)
