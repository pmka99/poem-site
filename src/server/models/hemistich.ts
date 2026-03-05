import mongoose, { Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IHemistich extends Document {
    poemId: mongoose.Types.ObjectId;
    text: string;
    order: number;
    show: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const hemistichSchema = new mongoose.Schema<IHemistich>({
    poemId: { type: mongoose.Schema.Types.ObjectId, ref: "Poem", required: true },
    text: { type: String, required: true },
    order: { type: Number, required: true },
    show: { type: Boolean, default: false },
}, { timestamps: true });

// اضافه کردن paginate
hemistichSchema.plugin(mongoosePaginate);

const HemistichModel = mongoose.model<IHemistich, mongoose.PaginateModel<IHemistich>>(
    "Hemistich",
    hemistichSchema
);
export default HemistichModel;