import mongoose from "mongoose";

export interface IAuthor extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    description: string;
}

const authorSchema = new mongoose.Schema<IAuthor>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

const AuthorModel = mongoose.models.Author || mongoose.model<IAuthor>("Author", authorSchema);

export default AuthorModel;