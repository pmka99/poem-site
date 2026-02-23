
import { connectDB } from "@/utils/db";
import PoemModel, { IPoem } from "@/models/poem";
import { NextResponse } from 'next/server';
import HemistichModel from "@/models/hemistich";


export async function GET(ctx: { params: { id: string } }) {
    await connectDB();
    const { id } = ctx.params;
    const poem: IPoem | null = await PoemModel.findById(id);

    if (!poem) {
        return NextResponse.json({ error: "Poem not found" }, { status: 404 });
    }

    return NextResponse.json(poem);
}

export async function PUT(request: Request, ctx: { params: { id: string } }) {
    await connectDB();
    const { id } = ctx.params;
    const { text, order } = await request.json();

    const updatedHemistich = await HemistichModel.findByIdAndUpdate(
        id,
        { text, order },
        { new: true }
    );

    if (!updatedHemistich) {
        return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
    }

    return NextResponse.json(updatedHemistich);
}

export async function DELETE(ctx: { params: { id: string } }) {
    await connectDB();
    const { id } = ctx.params;  
    const deletedHemistich = await HemistichModel.findByIdAndDelete(id);

    if (!deletedHemistich) {
        return NextResponse.json({ error: "Hemistich not found" }, { status: 404 });
    }   
    return NextResponse.json({ message: "Hemistich deleted successfully" });
}