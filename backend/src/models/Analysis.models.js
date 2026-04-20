import { Schema, model } from "mongoose";

const analysisSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        code: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        grade: {
            type: String,
            enum: ["A", "B", "C", "D", "F"],
            required: true
        },
        resultId: {
            type: Schema.Types.ObjectId,
            ref: "Result",
            required: true
        }
    }
);

export const Analysis = model("Analysis", analysisSchema);