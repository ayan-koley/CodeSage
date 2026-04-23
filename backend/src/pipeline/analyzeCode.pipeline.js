import { runASTAnalysis } from "../services/ast.services.js";
import { runLint } from "../services/lint.services.js";
import { getImprovements } from "../services/ai.services.js";


import { normalizeIssues } from "./normalizeIssues.js";
import { resolveConflicts } from "./resolveConflicts.js";


export const analyzeCode = async(code) => {
    try {
        const eslintIssues = await runLint(code);
        const { issues: astIssues } = await runASTAnalysis(code);


        // normalized + resolve conflicts 
        const issueNormalize = normalizeIssues(eslintIssues, astIssues);
        const resolveConflictsIssues = resolveConflicts(issueNormalize);
        const { response, responseText } = await getImprovements(code, resolveConflictsIssues); 
        console.log("response from ai ", responseText);
        console.log(typeof responseText);

        return JSON.parse(responseText);

    } catch (e) {
        console.error("something went wrong with the code ", e.message);
        throw new Error("Failed to analyze code");
    }
}