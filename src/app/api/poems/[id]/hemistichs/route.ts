import HemistichModel, { IHemistich } from "@/models/hemistich";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

/** get all hemistichs of a poem */ 
export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
    const { id } = await ctx.params;

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    await connectDB();

    const result = await HemistichModel.paginate({ poemId: id }, { limit, page, populate: ["author", "poemType"] });
    const hemistichs: IHemistich[] = result.docs;

    return NextResponse.json(hemistichs);
}

/** add a hemistich to a poem */
export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
    const { id } = await ctx.params;
    await connectDB();

    

}

/** delete all hemistichs of a poem */
export async function DELETE(request: Request, ctx: { params: Promise<{ id: string }> }) {
    const { id } = await ctx.params;
    await connectDB();

    await HemistichModel.deleteMany({ poemId: id });

    return NextResponse.json({ message: "Hemistichs deleted successfully" });
}

