import { IPoem } from "@/server/models/poem";
import { PoemResponse } from "@/shared/types/poem.type";
import { mapId, mapRelation, mapArray } from "../utils/mapper";

import { toUserResponse } from "./user.mapper";
import { toPoemTypeResponse } from "./poemType.mapper";
import { toHemistichResponse } from "./hemistich.mapper";
import { toCommentResponse } from "./comment.mapper";

export const toPoemResponse = (doc: IPoem): PoemResponse => ({
    _id: mapId(doc._id),

    title: doc.title,

    author: mapRelation(doc.author, toUserResponse),

    story: doc.story,

    poemType: mapRelation(doc.poemType, toPoemTypeResponse),

    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,

    hemistichs: mapArray(doc.hemistichs, toHemistichResponse),
    comments: mapArray(doc.comments, toCommentResponse),
});
