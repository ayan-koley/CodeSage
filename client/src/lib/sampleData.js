// Sample original code & AI review JSON for CodeSage demo
export const SAMPLE_CODE = `function fetchUser(id) {
  console.log("fetching user", id);
  var url = "https://api.example.com/users/" + id;
  fetch(url).then(res => {
    res.json().then(data => {
      console.log(data);
      window.user = data;
    });
  });
}

function calcTotal(items) {
  let total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}

fetchUser(42);
`;

export const SAMPLE_REVIEW = {
  summary: {
    totalIssues: 6,
    totalFixes: 5,
    confidence: 92,
    notes:
      "Replaces var with const/let, removes console statements, switches to async/await, and avoids polluting the global scope.",
  },
  issues: [
    {
      id: "i1",
      rule: "no-console",
      severity: "low",
      line: 2,
      suggestion: "Remove debug console.log calls before shipping.",
      fix: "Delete console.log statement.",
    },
    {
      id: "i2",
      rule: "no-var",
      severity: "medium",
      line: 3,
      suggestion: "Use const for values that are never reassigned.",
      fix: "Replace `var url` with `const url`.",
    },
    {
      id: "i3",
      rule: "prefer-async-await",
      severity: "medium",
      line: 4,
      suggestion: "Nested .then() chains are hard to read — use async/await.",
      fix: "Refactor fetch chain into async/await.",
    },
    {
      id: "i4",
      rule: "no-console",
      severity: "low",
      line: 6,
      suggestion: "Remove debug console.log calls before shipping.",
      fix: "Delete console.log statement.",
    },
    {
      id: "i5",
      rule: "no-global-assign",
      severity: "high",
      line: 7,
      suggestion: "Avoid attaching app data to the global window object.",
      fix: "Return data from the function instead.",
    },
    {
      id: "i6",
      rule: "no-var",
      severity: "medium",
      line: 14,
      suggestion: "Use let in for-loops instead of var.",
      fix: "Replace `var i` with `let i`.",
    },
  ],
  fixes: [
    { id: "f1", type: "delete", line: 2 },
    { id: "f2", type: "replace", line: 3, newCode: '  const url = `https://api.example.com/users/${id}`;' },
    {
      id: "f3",
      type: "replace",
      line: 4,
      newCode: "  const res = await fetch(url);",
    },
    { id: "f4", type: "replace", line: 5, newCode: "  const data = await res.json();" },
    { id: "f5", type: "delete", line: 6 },
    { id: "f6", type: "replace", line: 7, newCode: "  return data;" },
    { id: "f7", type: "delete", line: 8 },
    { id: "f8", type: "delete", line: 9 },
    { id: "f9", type: "replace", line: 1, newCode: "async function fetchUser(id) {" },
    { id: "f10", type: "replace", line: 14, newCode: "  for (let i = 0; i < items.length; i++) {" },
    { id: "f11", type: "replace", line: 15, newCode: "    total += items[i].price;" },
  ],
};
