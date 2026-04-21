export function strictEqualityRule(path) {
  if (
    path.isBinaryExpression() &&
    (path.node.operator === "==" || path.node.operator === "!=")
  ) {
    return {
      type: "warning",
      message: "Use strict equality (=== / !==)",
      line: path.node.loc.start.line,
    };
  }
}