import HemistichModel, { IHemistich } from "@/server/models/hemistich";
import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";

type RouteContext = { params: { id: string } }

/** get all hemistichs of a poem */
export async function GET(request: Request, ctx: RouteContext) {
    const { id } = ctx.params;

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const text = url.searchParams.get("text");

    const filter: any = { poemId: id };
    if (text) filter.text = { $regex: text, $options: "i" };

    await connectDB();

    const result = await HemistichModel.paginate(filter,
        { limit, page, populate: ["author", "poemType"], lean: true });
    const hemistichs: IHemistich[] = result.docs;

    return NextResponse.json(hemistichs);
}

/** add a hemistich to a poem */
/* check if poem exists */
export async function POST(request: Request, ctx: RouteContext) {
    const { id } = ctx.params;
    await connectDB();

    const { text, order } = await request.json() as IHemistich;
    const newHemistich: IHemistich = await HemistichModel.create(
        { text, order, poemId: id }
    );

    return NextResponse.json(newHemistich);
}

/** delete all hemistichs of a poem */
export async function DELETE(_req: Request, ctx: RouteContext) {
    const { id } = ctx.params;
    await connectDB();

    await HemistichModel.deleteMany({ poemId: id });

    return NextResponse.json({ message: "Hemistichs deleted successfully" });
}

