export function unusedVariableRule(path) {
  if (path.isVariableDeclarator()) {
    const name = path.node.id.name;
    const binding = path.scope.getBinding(name);

    if (binding && !binding.referenced) {
      return {
        type: "warning",
        message: `Unused variable '${name}'`,
        line: path.node.loc.start.line,
      };
    }
  }
}