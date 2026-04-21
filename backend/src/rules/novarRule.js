export function noVarRule(path) {
  if (path.isVariableDeclaration() && path.node.kind === "var") {
    return {
      type: "warning",
      message: "Avoid using 'var', use 'let' or 'const'",
      line: path.node.loc.start.line
    };
  }
}