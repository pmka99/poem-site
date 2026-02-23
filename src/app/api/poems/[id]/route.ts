import { connectDB } from "@/utils/db";
import PoemModel, { IPoem } from "@/models/poem";
import { NextRequest, NextResponse } from 'next/server';

/** get a poem by id */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    const { id } = await ctx.params

    await connectDB();

    const poems: IPoem | null = await PoemModel.findById(id).lean();

    return NextResponse.json(poems);
}

/** update a poem by id */
export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
    const { id } = await ctx.params;
    await connectDB();

    const { title, about, story, comments, author, poemType }: IPoem = await request.json();
    const updatedPoem: IPoem | null = await PoemModel.findByIdAndUpdate(id, { title, about, story, comments, author, poemType }, { new: true });

    return NextResponse.json(updatedPoem);
}

/** delete a poem by id */
export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
    const { id } = await ctx.params;
    await connectDB();
    await PoemModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Poem deleted successfully" });
}