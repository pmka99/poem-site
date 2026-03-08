import mongoose, { Document } from "mongoose";

export interface IStory extends Document {
    text: string[];
    poem: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const storySchema = new mongoose.Schema<IStory>({
    text: [{ type: String, required: true }],
    poem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poem",
        required: true,
    },
}, { timestamps: true });


const StoryModel = mongoose.models.Story || mongoose.model<IStory>("Story", storySchema);

export default StoryModel;