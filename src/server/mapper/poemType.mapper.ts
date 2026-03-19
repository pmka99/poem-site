import { IPoemType } from "@/server/models/poemType";
import { PoemTypeResponse } from "@/shared/types/poemType.type";
import { mapId } from "../utils/mapper";

export const toPoemTypeResponse = (doc: IPoemType): PoemTypeResponse => ({
    _id: mapId(doc._id),
    name: doc.name,
    description: doc.description ?? "",
    layout: doc.layout,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
