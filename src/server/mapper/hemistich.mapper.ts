import { IHemistich } from "@/server/models/hemistich";
import { HemistichResponse } from "@/shared/types/hemistich.type";
import { mapId } from "../utils/mapper";

export const toHemistichResponse = (doc: IHemistich): HemistichResponse => ({
    _id: mapId(doc._id),
    poem: mapId(doc.poem),
    text: doc.text,
    order: doc.order,
    show: doc.show,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
