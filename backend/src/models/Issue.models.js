import { Schema, model } from "mongoose";

const issueSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["bug", "warning"],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true
        },
        explanation: {
            type: String
        },
        fix: {
            type: String
        },
        fixedCode: {
            type: String
        },
        lineNumber: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

export const Issue = model("Issue", issueSchema);