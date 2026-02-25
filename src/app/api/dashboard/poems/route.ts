import { connectDB } from "@/server/utils/db";
import PoemModel, { IPoem } from "@/server/models/poem";
import { NextResponse } from 'next/server';
import { validateBody } from "@/server/validators";
import { createPoemSchema } from "@/schemas/poem.schema";

/** get all poems with pagination */
export async function GET(request: Request) {
    await connectDB();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const author = url.searchParams.get("author");
    const poemType = url.searchParams.get("poemType");
    const text = url.searchParams.get("text");

    // search for hemistichs that match the text and get their poem IDs
    const resultOfHemistich = await PoemModel.find({ story: { $regex: text || "", $options: "i" } }).select("_id");
    const hemistichIds = resultOfHemistich.map((poem) => poem._id);

    const filter: any = {};
    if (author) filter.author = author;
    if (poemType) filter.poemType = poemType;
    if (text) filter._id = { $in: hemistichIds };

    const result = await PoemModel.paginate(filter, { limit, page, populate: ["author", "poemType"], lean: true });
    const poems: IPoem[] = result.docs;

    return NextResponse.json(poems);
}

/** add a new poem */
export async function POST(request: Request) {
    await connectDB();
    const poem: IPoem = await request.json();

    // validation    
    validateBody(createPoemSchema, poem);

    const newPoem: IPoem = await PoemModel.create(
        poem
    );

    return NextResponse.json(newPoem);
}