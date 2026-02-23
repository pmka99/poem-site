import mongoose from "mongoose";

const poemTypesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    about: { type: String },
},
    { timestamps: true }
);

const PoemTypesModel = mongoose.models.PoemTypes || mongoose.model("PoemTypes", poemTypesSchema);

export default PoemTypesModel;