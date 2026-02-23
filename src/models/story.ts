import mongoose, { Document } from "mongoose";
    
export interface IStory extends Document {
    text: string;
    order: number;
}

const storySchema = new mongoose.Schema<IStory>({
    text: { type: String, required: true },
    order: { type: Number, required: true }
}, { timestamps: true });


const StoryModel = mongoose.models.Story || mongoose.model<IStory>("Story", storySchema);

export default StoryModel;