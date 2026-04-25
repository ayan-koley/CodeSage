import { getAuth } from '@clerk/express';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.models.js';

export const requriedAuth = async (req, res, next) => {
    try {
        const { sessionClaims } = getAuth(req);
        const clerkId = sessionClaims?.sub;
        
        if(!clerkId) {
            throw new ApiError(401, "Unauthorized: Invalid or missing token");
        }
        const user = await User.findOne({clerkId}) 
        if(!user) {
            throw new ApiError(404, "User is not founded");
        }
        req.user = user;
        next();
    } catch (e) {
        throw new ApiError(400, e.message);
    }
}