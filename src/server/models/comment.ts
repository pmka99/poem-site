import mongoose from "mongoose";

export interface IComment extends mongoose.Document {
    author: mongoose.Types.ObjectId;
    poemId: mongoose.Types.ObjectId;
    text: string;
    replyId?: mongoose.Types.ObjectId;
    show: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export const commentSchema = new mongoose.Schema<IComment>({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    poemId: { type: mongoose.Schema.Types.ObjectId, ref: "Poem", required: true },
    text: { type: String, required: true },
    replyId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    show: { type: Boolean, default: false },
}, { timestamps: true });

const CommentModel = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default CommentModel;