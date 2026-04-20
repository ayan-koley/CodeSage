import { Schema, model } from "mongoose";

const improvementSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        explanation: {
            type: String,
            required: true
        },
        suggestion: {
            type: String,
            required: true
        },
        refactoredCode: {
            type: String,
            required: true
        },
        impact: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Improvement = model("Improvement", improvementSchema);


