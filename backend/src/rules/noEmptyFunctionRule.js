export function noEmptyFunctionRule(path) {
  if (
    path.isFunctionDeclaration() &&
    path.node.body.body.length === 0
  ) {
    return {
      type: "warning",
      message: "Empty function detected",
      line: path.node.loc.start.line,
    };
  }
}