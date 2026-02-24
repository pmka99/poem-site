import mongoose from "mongoose";

export interface IComment extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    poemId: mongoose.Types.ObjectId;
    text: string;
    replyId?: mongoose.Types.ObjectId;
}

export const commentSchema = new mongoose.Schema<IComment>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    poemId: { type: mongoose.Schema.Types.ObjectId, ref: "Poem", required: true },
    text: { type: String, required: true },
    replyId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
}, { timestamps: true });

const CommentModel = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default CommentModel;