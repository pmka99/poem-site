import { connectDB } from "@/server/utils/db";
import PoemModel, { IPoem } from "@/server/models/poem";
import { NextRequest, NextResponse } from 'next/server';
import { validateBody, validateId } from "@/server/validator";
import { updatePoemSchema } from "@/schemas/poem.schema";

const collectionName = "شعر";

type RouteContext = { params: { id: string } }

/** get a poem by id */
export async function GET(_req: NextRequest, ctx: RouteContext) {
    const { id } = ctx.params

    // validation
    validateId(id, collectionName);

    await connectDB();

    const poems: IPoem | null = await PoemModel.findById(id).lean();

    return NextResponse.json(poems);
}

/** update a poem by id */
export async function PUT(request: Request, ctx: RouteContext) {
    const { id } = ctx.params;
    const poem: IPoem = await request.json();

    // validation
    validateId(id, collectionName);
    validateBody(updatePoemSchema, poem);

    await connectDB();

    const updatedPoem: IPoem | null = await PoemModel.findByIdAndUpdate(id, poem, { new: true });

    return NextResponse.json(updatedPoem);
}

/** delete a poem by id */
export async function DELETE(_req: Request, ctx: RouteContext) {
    const { id } = ctx.params;
    await connectDB();

    await PoemModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Poem deleted successfully" });
}