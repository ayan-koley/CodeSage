export const resolveConflicts = (eslintIssues, astIssues) => {
    const map = new Map();

    // add eslint issues to the map
    eslintIssues.forEach(issue => {
        const key = `${issue.ruleId}-${issue.lineNumber}-${issue.name}`;
        map.set(key, issue);
    });

    // add ast issues and if conflict accurs, add both 
    astIssues.forEach(issue => {
        const key = `${issue.ruleId}-${issue.lineNumber}-${issue.name}`;

        if(map.has(key)) {
            const existing = map.get(key);

            existing.message.push(...issue.message);
            existing.source.push(...issue.source);
            existing.type = "architecture";
        }   else {
            map.set(key, issue);
        }
    })

    return Array.from(map.values());
}