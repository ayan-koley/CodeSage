export function noConsoleLogRule(path) {
  if (
    path.isCallExpression() &&
    path.node.callee.object?.name === "console" &&
    path.node.callee.property?.name === "log"
  ) {
    return {
      type: "info",
      message: "Remove console.log in production",
      line: path.node.loc.start.line,
    };
  }
}