import { IStory } from "@/server/models/story";
import { StoryResponse } from "@/shared/types/story.type";
import { mapId } from "../utils/mapper";

export const toStoryResponse = (doc: IStory): StoryResponse => ({
    _id: mapId(doc._id),
    text: doc.text,
    poem: mapId(doc.poem),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
