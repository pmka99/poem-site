import mongoose from "mongoose";

export interface IAuthor extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    description: string;
    ownedPoems: mongoose.Types.ObjectId[]
}

const authorSchema = new mongoose.Schema<IAuthor>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: { type: String, required: true },
    description: { type: String },
    ownedPoems: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Poem",
                required: true
            }
        ],
        required:true,
        default: []
    }
}, { timestamps: true });

const AuthorModel = mongoose.models.Author || mongoose.model<IAuthor>("Author", authorSchema);

export default AuthorModel;