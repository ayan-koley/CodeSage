export function noDebuggerRule(path) {
  if (path.isDebuggerStatement()) {
    return {
      type: "error",
      message: "Remove debugger statement",
      line: path.node.loc.start.line,
    };
  }
}