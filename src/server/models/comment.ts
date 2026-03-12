import mongoose from "mongoose";

export interface IComment extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    poem: mongoose.Types.ObjectId;
    text: string;
    parrent?: mongoose.Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}

export const commentSchema = new mongoose.Schema<IComment>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    poem: { type: mongoose.Schema.Types.ObjectId, ref: "Poem", required: true },
    text: { type: String, required: true },
    parrent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
}, { timestamps: true, versionKey: false });

const CommentModel = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default CommentModel;