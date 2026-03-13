import { createHemistichSchema } from "@shared/schemas/hemistich.schema";
import { protectedRoute } from "@server/guard/protectedRoute";
import HemistichModel, { IHemistich } from "@server/models/hemistich";
import { connectDB } from "@server/utils/db";
import { createIdParamsSchema } from "@server/validators";
import { NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/server/utils/response";
import { Action, Resource } from "@/enum/permission";


const paramsSchema = createIdParamsSchema(["poemId"], [])
const queryParamsSchema = createIdParamsSchema([], ["page", "limit", "text"])

/** get all hemistichs of a poem */
export const GET = protectedRoute(
    {
        require: [
            { action: Action.READ, resource: Resource.HEMISTICH },
            { action: Action.READ, resource: Resource.POEM }
        ],
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

        await connectDB();

        const result = await HemistichModel.paginate(filter,
            { limit, page, populate: ["author", "poemType"], lean: true });
        const hemistichs: IHemistich[] = result.docs;

        return successResponse({ data: hemistichs });
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
        paramsSchema: paramsSchema,
        bodySchema: createHemistichSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemId } = params;
        await connectDB();
        const poemExists = await HemistichModel.exists({ poem: poemId });
        if (!poemExists) {
            return errorResponse({ message: "شعری یافت نشد", status: 404 });
        }
        const newHemistich: IHemistich = await HemistichModel.create(
            body
        );
        return successResponse({ data: newHemistich });
    }
)

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
        return NextResponse.json({ message: "Hemistichs deleted successfully" });
    }
)
