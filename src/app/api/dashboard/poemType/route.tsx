import PoemTypesModel, { IPoemType } from "../../../../server/models/poemTypes";
import { connectDB } from "../../../../server/utils/db";
import { NextResponse } from "next/server";


/** get all poem types */
export async function GET() {
    await connectDB();

    const poemTypes = await PoemTypesModel.find().lean();

    return NextResponse.json({ data: poemTypes });
}

/** add a new poem type */
export async function POST(request: Request) {
    await connectDB();
    const poemType = await request.json() as IPoemType;
    const newPoemType = await PoemTypesModel.create(poemType);

    return NextResponse.json({ data: newPoemType });
}
