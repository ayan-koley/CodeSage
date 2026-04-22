export const resolveConflicts = (issues) => {
    const map = new Map();

    for(const issue of issues) {
        const key = `${issue.lineNumber}-${issue.title}`;

        if(!map.has(key)) {
            map.set(key, issue);
        }   else {
            const existing = map.get(key);
            if(existing.source === "eslint") {
                map.set(key, issue);
            }
        }
    }

    return Array.from(map.values());
}