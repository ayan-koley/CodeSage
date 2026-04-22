export const normalizeIssues = (eslintIssues, astIssues) => {
    const normalizedESLintIssues = eslintIssues.map((msg) => {
        return {
            source: "eslint",
            id: msg.ruleId,
            type: msg.type,
            title: msg.title,
            explanation: msg.explanation,
            fix: msg.fix,
            severity: msg.severity,
            lineNumber: msg.lineNumber
        }
    })

    const normalizedAstIssues = astIssues.map((msg) => {
        return {
            source: "ast",
            id: "custom-rule",
            type: msg.type || "info",
            title: msg.message,
            explanation: msg.message,
            fix: null,
            severity: "low",
            lineNumber: msg.line
        }
    })

    return [...normalizedESLintIssues, ...normalizedAstIssues];
}