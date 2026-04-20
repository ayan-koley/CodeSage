import mongoose from 'mongoose';

export const connectDB =  () => {
    return Promise.resolve(mongoose.connect(process.env.MONGODB_URI));
}