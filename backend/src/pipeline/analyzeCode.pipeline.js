// TODO: properly issues are not generated

import { runASTAnalysis } from "../services/ast.services.js";
import { runLint } from "../services/lint.services.js";
import { getImprovements } from "../services/ai.services.js";

import { normalizeIssues } from "./normalizeIssues.js";
import { resolveConflicts } from "./resolveConflicts.js";

export const analyzeCode = async(code) => {
    try {
        const eslintIssues = await runLint(code);
        const { issues: astIssues } = await runASTAnalysis(code);

        const resolveConflictsIssues = resolveConflicts(eslintIssues, astIssues);
        const responseText = await getImprovements(code, resolveConflictsIssues);

        const response = JSON.parse(responseText);
        response.issues = resolveConflictsIssues;

        return response;
    } catch (e) {
        console.error("something went wrong with the code ", e.message);
        throw new Error("Failed to analyze code");
    }
}