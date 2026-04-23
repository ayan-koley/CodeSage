import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { analyzeCode } from "../pipeline/analyzeCode.pipeline.js";

export const createAnalysisController = asyncHandler(async (req, res) => {
    const { code } = req.body;
    
    if(!code) {
        throw new ApiError(400, "Code is required");
    }

    const response = await analyzeCode(code);
    console.log("response from pipeline ", response);
    return res.status(200)
    .json(
        new ApiResponse(200, response, "Code analysis completed successfully")
    );

});