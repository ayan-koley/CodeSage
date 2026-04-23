import { Schema, model } from "mongoose";

const fixSchema = new Schema({
    issueId: { 
        type: Schema.Types.ObjectId, 
        ref: "Issue",
        required: true 
    },
    type: { 
        type: String, 
        enum: ["replace", "insert", "delete"],
        required: true
    },
    lineStart: { 
        type: Number, 
        required: true 
    },
    lineEnd: { 
        type: Number, 
        required: true 
    },
    columnStart: { 
        type: Number 
    },
    columnEnd: { 
        type: Number 
    },
    oldCode: { 
        type: String 
    },
    newCode: { 
        type: String 
    },
    confidence: { 
        type: Number,
        min: 0,
        max: 1,
    }
}, { timestamps: true })

export const Fix = model("Fix", fixSchema)