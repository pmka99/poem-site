import { ICategory } from "@/server/models/category";
import { CategoryResponse } from "@/shared/types/category.type";
import { mapId } from "../utils/mapper";

export const toCategoryResponse = (doc: ICategory): CategoryResponse => ({
    _id: mapId(doc._id),
    title: doc.title,
    description: doc.description ?? "",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
