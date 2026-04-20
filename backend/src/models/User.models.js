import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
        },
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
userSchema.index({ clerkId: 1 }, { unique: true });

export const User = model("User", userSchema);