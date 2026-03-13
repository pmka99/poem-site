import { connectDB } from "@server/utils/db";
import PoemModel, { IPoem } from "@server/models/poem";
import { NextResponse } from 'next/server';
import { createIdParamsSchema } from "@server/validators";
import { updatePoemSchema } from "@shared/schemas/poem.schema";
import { protectedRoute } from "@server/guard/protectedRoute";
import { Action, Resource } from "@/enum/permission";

const paramsSchema = createIdParamsSchema(["poemId"], [])

/** get a poem by id */
export const GET = protectedRoute(
    {
        require: [
            { action: Action.READ, resource: Resource.POEM }
        ],
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
        require: [
            { action: Action.UPDATE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
        bodySchema: updatePoemSchema
    },
    async (_req, _ctx, { params, body }) => {
        const { poemId } = params;

        await connectDB();

        const updatedPoem: IPoem | null = await PoemModel.findByIdAndUpdate(poemId, body, { new: true });

        return NextResponse.json({ data: updatedPoem });
    }
);

/** delete a poem by id */
export const DELETE = protectedRoute(
    {
        require: [
            { action: Action.DELETE, resource: Resource.POEM }
        ],
        paramsSchema: paramsSchema,
    },
    async (_req, _ctx, { params }) => {
        const { poemId } = params;
        await connectDB();
        await PoemModel.findByIdAndDelete(poemId);
        return NextResponse.json({ message: "Poem deleted successfully" });
    }
);