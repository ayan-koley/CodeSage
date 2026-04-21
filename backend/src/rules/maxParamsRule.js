export function maxParamsRule(path) {
  if (
    path.isFunctionDeclaration() &&
    path.node.params.length > 3
  ) {
    return {
      type: "info",
      message: "Too many parameters (max 3 recommended)",
      line: path.node.loc.start.line,
    };
  }
}