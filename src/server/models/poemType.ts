import { LayoutPoemType } from "@/enum/poemType";
import mongoose from "mongoose";

export interface IPoemType extends mongoose.Document {
    name: string;
    description?: string;
    layout: LayoutPoemType
    createdAt: Date;
    updatedAt: Date;
}

const poemTypeSchema = new mongoose.Schema<IPoemType>({
    name: { type: String, required: true },
    layout: {
        type: String,
        enum: Object.values(LayoutPoemType),
        default: LayoutPoemType.COUPLET
    },
    description: { type: String },
},
    { timestamps: true, versionKey: false }
);

const PoemTypeModel = mongoose.models.PoemType || mongoose.model<IPoemType>("PoemType", poemTypeSchema);

export default PoemTypeModel;