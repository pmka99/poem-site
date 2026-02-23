import { connectDB } from "@/utils/db";
import PoemModel, { IPoem } from "@/models/poem";
import { NextResponse } from 'next/server';

/** get all poems with pagination */
export async function GET(request: Request) {
    await connectDB();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const result = await PoemModel.paginate({}, { limit, page, populate: ["author", "poemType"] });
    const poems: IPoem[] = result.docs;

    return NextResponse.json(poems);
}

/** add a new poem */
export async function POST(request: Request) {
    await connectDB();
    const { title, poemType, author, about, story, comments }: IPoem = await request.json();

    const newPoem: IPoem = await PoemModel.create(
        { title, poemType, author, about, story, comments }
    );

    return NextResponse.json(newPoem);
}