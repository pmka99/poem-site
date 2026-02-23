import mongoose from "mongoose";

export interface IAuthor extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    about: string;
}

const authorSchema = new mongoose.Schema<IAuthor>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    about: { type: String }
}, { timestamps: true });

const AuthorModel = mongoose.models.Author || mongoose.model<IAuthor>("Author", authorSchema);

export default AuthorModel;