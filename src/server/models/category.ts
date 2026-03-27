import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
    title: string;
    description?: string;

    createdAt: Date;
    updatedAt: Date;
}

export const categorySchema = new mongoose.Schema<ICategory>({
    title: { type: String, required: true },
    description: { type: String },
}, { timestamps: true, versionKey: false });

const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;