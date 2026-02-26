import { connectDB } from "../../../../../../server/utils/db";
import PoemModel, { IPoem } from "../../../../../../server/models/poem";
import { NextResponse } from 'next/server';
import { createIdParamsSchema } from "../../../../../../server/validators";
import { updatePoemSchema } from "../../../../../../server/schemas/poem.schema";
import { protectedRoute } from "../../../../../../server/guard/protectedRoute";

const paramsSchema = createIdParamsSchema(["poemId"], [])

/** get a poem by id */
export const GET = protectedRoute(
    {
        require: [{ action: "read", resource: "poem" }],
        paramsSchema: paramsSchema
    },
    async (_req, _ctx, { params }) => {
        const { poemId } = params;
        await connectDB();

        const poems: IPoem | null = await PoemModel.findById(poemId).lean();

        return NextResponse.json(poems);
    }
);

/** update a poem by id */
export const PUT = protectedRoute(
    {
        require: [{ action: "update", resource: "poem" }],
        paramsSchema: paramsSchema,
        bodySchema: updatePoemSchema
    },
    async (request, _ctx, { params, body }) => {
        const { poemId } = params;

        await connectDB();

        const updatedPoem: IPoem | null = await PoemModel.findByIdAndUpdate(poemId, body, { new: true });

        return NextResponse.json(updatedPoem);
    }
);

/** delete a poem by id */
export const DELETE = protectedRoute(
    {
        require: [{ action: "delete", resource: "poem" }],
        paramsSchema: paramsSchema,
    },
    async (_req, _ctx, { params }) => {
        const { poemId } = params;
        await connectDB();
        await PoemModel.findByIdAndDelete(poemId);
        return NextResponse.json({ message: "Poem deleted successfully" });
    }
);