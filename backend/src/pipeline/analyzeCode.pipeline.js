import { runASTAnalysis } from "../services/ast.services.js";
import { runLint } from "../services/lint.services.js";
import { getImprovements } from "../services/ai.services.js";


import { normalizeIssues } from "./normalizeIssues.js";
import { resolveConflicts } from "./resolveConflicts.js";


const code = `function test() {
        let x = 10;
        console.log("Hello");
    }`;


const analyzeCode = async(code) => {
    try {
        const eslintIssues = await runLint(code);
        const { issues: astIssues } = await runASTAnalysis(code);


        // normalized + resolve conflicts 
        const issueNormalize = normalizeIssues(eslintIssues, astIssues);
        const resolveConflictsIssues = resolveConflicts(issueNormalize);
        const { response, responseText } = await getImprovements(code, resolveConflictsIssues); 

        console.log("response ", response)
        console.log("response Text ", responseText);

    } catch (e) {
        console.error("something went wrong with the code ", e.message);
    }
}

analyzeCode(code);