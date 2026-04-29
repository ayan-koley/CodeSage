import { ESLint } from 'eslint';

const mapLintToIssue = (msg) => {
    return {
        source: ["eslint"],
        type: msg.severity === 2 ? "bug" : "warning",
        ruleId: msg.ruleId,
        title: msg.ruleId || "Unknown Issue",
        severity: getSeverity(msg),
        suggestions: [msg.message],
        fix: msg.suggestions?.[0]?.desc || null,
        lineNumber: msg.line,
        column: msg.column,
        name: extractNameFromMsg(msg)
    };
}

function extractNameFromMsg(msg) {
  const match = msg.message.match(/'(.+?)'/);
  return match ? match[1] : null;
}

const getSeverity = (msg) => {
  if (msg.severity === 2) return "high";    

  if (msg.ruleId === "no-unused-vars") return "low";

  return "medium";
};

export const runLint = async (code, fileName="src/file.js") => {
    try {
        // 1. create an instance
        const eslint = new ESLint({
            overrideConfigFile: "eslint.config.js"
        });
        // lint text
        const results = await eslint.lintText(code, { filePath: fileName });
        const lintResult = results[0].messages;
        
        return lintResult.map((msg) => mapLintToIssue(msg));
    } catch (e) {
        console.error('Error occurred while running ESLint:', e.message);
    }
};