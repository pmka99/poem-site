import mongoose, { Schema, model, models, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import type { PaginateModel } from "mongoose";
import { IUser } from "./user";
import { IPoemType } from "./poemType";
import { IHemistich } from "./hemistich";
import { IComment } from "./comment";
import { ICategory } from "./category";


export interface IPoem extends mongoose.Document {
    title: string;

    author: Types.ObjectId | IUser;
    story: string[];
    poemType: Types.ObjectId | IPoemType;
    show: boolean;
    category: Types.ObjectId | ICategory;
    order: number;

    createdAt?: Date;
    updatedAt?: Date;

    hemistichs?: IHemistich[];
    comments?: IComment[];
}

const poemSchema = new Schema<IPoem>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        story: [{
            type: String,
            required: false,
        }],

        poemType: {
            type: Schema.Types.ObjectId,
            ref: "PoemType",
            required: true,
        },

        show: {
            type: Boolean,
            required: true,
            default: true,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        order: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        versionKey: false
    }
);

poemSchema.virtual("hemistichs", {
    ref: "Hemistich",
    localField: "_id",
    foreignField: "poem"
});

poemSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "poem"
});

poemSchema.index({ order: -1 })
poemSchema.index({ createdAt: -1 });

poemSchema.plugin(mongoosePaginate);

const PoemModel =
    (mongoose.models.Poem as PaginateModel<IPoem>) ||
    mongoose.model<IPoem, PaginateModel<IPoem>>("Poem", poemSchema);


export default PoemModel
