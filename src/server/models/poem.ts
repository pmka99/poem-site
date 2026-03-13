import mongoose, { Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IPoem extends Document {
    title: string;
    description?: string;
    show: boolean;
    author: mongoose.Types.ObjectId;
    story: mongoose.Types.ObjectId[];
    poemType: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[];
    hemistichs?: mongoose.Types.ObjectId[];

    createdAt: Date;
    updatedAt: Date;
}

const poemSchema = new mongoose.Schema<IPoem>(
    {
        title: { type: String, required: true },
        description: { type: String },
        show: { type: Boolean, default: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        poemType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PoemType",
            required: true,
        },
        story: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Story",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

poemSchema.virtual("hemistichs", {
    ref: "Hemistich",
    localField: "_id",
    foreignField: "poem",
    justOne: false,
});

poemSchema.set("toObject", { virtuals: true });
poemSchema.set("toJSON", { virtuals: true });

poemSchema.plugin(mongoosePaginate);

const PoemModel = mongoose.model<IPoem, PaginateModel<IPoem>>(
    "Poem",
    poemSchema
);

export default PoemModel;