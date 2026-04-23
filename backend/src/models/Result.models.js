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
        fixes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Fix",
                required: true
            }
        ],
        summary: {
            totalIssues: {
                type: Number,
                required: true
            },
            totalFixes: {
                type: Number,
                required: true
            },
            confidence: {
                type: Number,
                min: 0,
                max: 1,
                required: true
            },
            notes: {
                type: String,
                maxlength: 200
            }
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