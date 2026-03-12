import mongoose from "mongoose";

export interface IPoemType extends mongoose.Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const poemTypesSchema = new mongoose.Schema<IPoemType>({
    name: { type: String, required: true },
    description: { type: String },
},
    { timestamps: true, versionKey: false }
);

const PoemTypesModel = mongoose.models.PoemTypes || mongoose.model<IPoemType>("PoemTypes", poemTypesSchema);

export default PoemTypesModel;