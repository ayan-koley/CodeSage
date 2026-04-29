export function noUnusedFunctionRule(path) {
  if (path.isFunctionDeclaration()) {
    const name = path.node.id?.name;
    if (!name) return null;

    const binding = path.scope.getBinding(name);

    if (binding && binding.references === 0) {
      return {
        source: ["ast"],
        type: "warning",
        ruleId: "no-unused-vars",
        title: `Function '${name}' is defined but never used`,
        suggestions: [
          `Export the function '${name}' `,
        ],
        fix: `Add 'export' before the function declaration: export function ${name}() { ... }`,
        lineNumber: path.node.loc?.start.line || null,
        column: path.node.loc?.start.column || null,
        name: path.node.id.name
      };
    }
  }

  return null;
}