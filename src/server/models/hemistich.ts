import mongoose, { Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IPoem } from "./poem";

export interface IHemistich extends Document {
    poem: mongoose.Types.ObjectId | IPoem;
    text: string;
    order: number;
    show: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const hemistichSchema = new mongoose.Schema<IHemistich>({
    poem: { type: mongoose.Schema.Types.ObjectId, ref: "Poem", required: true },
    text: { type: String, required: true },
    order: { type: Number, required: true },
    show: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

// اضافه کردن paginate
hemistichSchema.plugin(mongoosePaginate);

const HemistichModel =
    mongoose.models.Hemistich ||
    mongoose.model<IHemistich, mongoose.PaginateModel<IHemistich>>(
        "Hemistich",
        hemistichSchema
    );
    
export default HemistichModel;