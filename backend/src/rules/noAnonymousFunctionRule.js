export function noAnonymousFunctionRule(path) {
     if(path.isFunctionDeclaration() && !path.node.id?.name) {
        return {
            type: "info",
            message: "Anonymous function detected",
            line: path.node.loc.start.line,
        }
     }
}