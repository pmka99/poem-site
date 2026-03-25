import mongoose, { Model } from "mongoose";

export interface IPoemType extends mongoose.Document {
    name: string;
    description?: string;
    layout: number;

    createdAt: Date;
    updatedAt: Date;
}

const poemTypeSchema = new mongoose.Schema<IPoemType>({
    name: { type: String, required: true },
    layout: {
        type: Number,
        default: 2
    },
    description: { type: String },
},
    { timestamps: true, versionKey: false }
);

const PoemTypeModel = (mongoose.models.PoemType as Model<IPoemType>) || mongoose.model<IPoemType>("PoemType", poemTypeSchema);

export default PoemTypeModel;