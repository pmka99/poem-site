import mongoose, { Schema, model, models, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import type { PaginateModel } from "mongoose";
import { IUser } from "./user";
import { IPoemType } from "./poemType";
import { IHemistich } from "./hemistich";
import { IComment } from "./comment";


export interface IPoem extends mongoose.Document {
    title: string;

    author: Types.ObjectId | IUser;
    // story: Types.ObjectId[] | IStory[];
    story: string[];
    poemType: Types.ObjectId | IPoemType;

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
            trim: true
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        // story: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Story"
        //     }
        // ],
        story: [{
            type: String,
            required: false,
        }],

        poemType: {
            type: Schema.Types.ObjectId,
            ref: "PoemType",
            required: true,
            index: true
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

poemSchema.index({ author: 1 });
poemSchema.index({ poemType: 1 });
poemSchema.index({ createdAt: -1 });

poemSchema.plugin(mongoosePaginate);

const PoemModel =
    (mongoose.models.Poem as PaginateModel<IPoem>) ||
    mongoose.model<IPoem, PaginateModel<IPoem>>("Poem", poemSchema);


export default PoemModel
