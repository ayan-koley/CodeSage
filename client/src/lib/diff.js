// Build a unified diff representation from original code + fixes.
// Returns an array of rows: { kind: 'context'|'del'|'add', oldLine, newLine, text, issueId? }
export function buildDiff(originalCode, fixes, issues = []) {
  const lines = originalCode.replace(/\n$/, "").split("\n");
  const fixByLine = new Map();
  for (const f of fixes) {
    if (!fixByLine.has(f.line)) fixByLine.set(f.line, []);
    fixByLine.get(f.line).push(f);
  }

  const issueByLine = new Map();
  for (const is of issues) {
    if (!issueByLine.has(is.line)) issueByLine.set(is.line, []);
    issueByLine.get(is.line).push(is);
  }

  const rows = [];
  let newLineNum = 1;
  for (let i = 0; i < lines.length; i++) {
    const oldLine = i + 1;
    const text = lines[i];
    const lineFixes = fixByLine.get(oldLine) || [];
    const issueIds = (issueByLine.get(oldLine) || []).map((x) => x.id);

    if (lineFixes.length === 0) {
      rows.push({ kind: "context", oldLine, newLine: newLineNum, text, issueIds });
      newLineNum++;
      continue;
    }

    // delete fix takes priority
    const del = lineFixes.find((f) => f.type === "delete");
    const rep = lineFixes.find((f) => f.type === "replace");
    const ins = lineFixes.find((f) => f.type === "insert");

    if (del) {
      rows.push({ kind: "del", oldLine, newLine: null, text, issueIds });
    } else if (rep) {
      rows.push({ kind: "del", oldLine, newLine: null, text, issueIds });
      rows.push({ kind: "add", oldLine: null, newLine: newLineNum, text: rep.newCode, issueIds });
      newLineNum++;
    } else if (ins) {
      rows.push({ kind: "context", oldLine, newLine: newLineNum, text, issueIds });
      newLineNum++;
      rows.push({ kind: "add", oldLine: null, newLine: newLineNum, text: ins.newCode, issueIds });
      newLineNum++;
    } else {
      rows.push({ kind: "context", oldLine, newLine: newLineNum, text, issueIds });
      newLineNum++;
    }
  }
  return rows;
}

// Produce final fixed code as a string.
export function applyFixes(originalCode, fixes) {
  const lines = originalCode.replace(/\n$/, "").split("\n");
  const out = [];
  const fixByLine = new Map();
  for (const f of fixes) {
    if (!fixByLine.has(f.line)) fixByLine.set(f.line, []);
    fixByLine.get(f.line).push(f);
  }
  for (let i = 0; i < lines.length; i++) {
    const ln = i + 1;
    const lineFixes = fixByLine.get(ln) || [];
    const del = lineFixes.find((f) => f.type === "delete");
    const rep = lineFixes.find((f) => f.type === "replace");
    const ins = lineFixes.find((f) => f.type === "insert");
    if (del) continue;
    if (rep) {
      out.push(rep.newCode);
    } else {
      out.push(lines[i]);
    }
    if (ins) out.push(ins.newCode);
  }
  return out.join("\n");
}
