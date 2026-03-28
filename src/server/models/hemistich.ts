import mongoose, { Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import type { PaginateModel } from "mongoose";
import { IPoem } from "./poem";

export interface IHemistich extends Document {
    poem: mongoose.Types.ObjectId;
    text: string;
    order: number;
    show: boolean;
    chapterTitle: string;
    description: string;

    createdAt: Date;
    updatedAt: Date;
}

const hemistichSchema = new mongoose.Schema<IHemistich>({
    poem: { type: mongoose.Schema.Types.ObjectId, ref: "Poem", required: true },
    text: { type: String, required: true },
    order: { type: Number, required: true },
    show: { type: Boolean, default: false },
    chapterTitle: { type: String, required: false },
    description: { type: String, required: false }
}, { timestamps: true, versionKey: false });

// اضافه کردن paginate
hemistichSchema.plugin(mongoosePaginate);
hemistichSchema.index({ poem: 1, order: -1 });

const HemistichModel =
    (mongoose.models.Hemistich as PaginateModel<IHemistich>) ||
    mongoose.model<IHemistich, PaginateModel<IHemistich>>("Hemistich", hemistichSchema);

export default HemistichModel;