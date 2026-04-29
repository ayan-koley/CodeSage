import babelParser from "@babel/parser";
import traverse from "@babel/traverse";
import { noUnusedFunctionRule } from "../rules/noUsedFunction.js";

const rules = [ noUnusedFunctionRule ];

export const runASTAnalysis = (code) => {
    try {
        const ast = babelParser.parse(code, {
            sourceType: "unambiguous",
            plugins: ["javascript", "typescript"],
        });

        const issues = [];
        traverse.default(ast, {
            enter(path) {
                rules.map(rule => {
                    const result = rule(path);
                    if(result) {
                         issues.push(result);
                    }
                })
            }
        })
        return { issues };

    } catch (e) {
        console.error("Error parsing AST:", e.message);
    }
}