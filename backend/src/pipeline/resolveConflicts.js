export const resolveConflicts = (eslintIssues, astIssues) => {
    const map = new Map();

    // add eslint issues to the map
    eslintIssues.forEach(issue => {
        const key = `${issue.lineNumber}-${issue.column}`;
        map.set(key, issue);
    });

    // add ast issues and if conflict accurs, add both 
    astIssues.forEach(issue => {
        const key = `${issue.lineNumber}-${issue.column}`;

        if(map.has(key)) {
            const existing = map.get(key);

            existing.suggestions.push(...existing.suggestions, ...issue.suggestions);
            existing.source.push(new Set([
                ...existing.source,
                ...issue.source
            ]));
            existing.type = "architecture";
        }   else {
            map.set(key, issue);
        }
    })

    return Array.from(map.values());
}