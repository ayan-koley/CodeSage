import { Schema, model } from "mongoose";

const breakdownSchema = new Schema(
    {
        readability: {
            type: Number,
            required: true
        },
        performance: {
            type: Number,
            required: true
        },
        security: {
            type: Number,
            required: true
        }
    },
    {
        _id: false
    }
)

const resultSchema = new Schema(
    {
        issues: [
            {
                type: Schema.Types.ObjectId,
                ref: "Issue",
                required: true
            }
        ],
        improvements: [
            {
                type: Schema.Types.ObjectId,
                ref: "Improvement",
                required: true
            }
        ],
        summary: {
            type: String,
            required: true
        },
        breakdown: {
            type: breakdownSchema,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Result = model("Result", resultSchema);