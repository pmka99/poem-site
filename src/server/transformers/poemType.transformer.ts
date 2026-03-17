import { IPoemType } from "@/server/models/poemType";
import { PoemTypeResponse } from "@/shared/types/poemType.type";

export const toPoemTypeResponse = (doc: IPoemType): PoemTypeResponse => ({
    _id: doc._id.toString(),
    name: doc.name,
    description: doc.description ?? "",
    layout: doc.layout,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
