import babelParser from "@babel/parser";
import traverse from "@babel/traverse";
import {
    maxParamsRule,
    noAnonymousFunctionRule,
    noConsoleLogRule,
    noDebuggerRule,
    noEmptyFunctionRule,
    noVarRule,
    strictEqualityRule,
    unusedVariableRule
 } from '../rules/index.js/'

const rules = [maxParamsRule, noAnonymousFunctionRule, noConsoleLogRule, noDebuggerRule, noEmptyFunctionRule, noVarRule, strictEqualityRule, unusedVariableRule];

export const runASTAnalysis = (code) => {
    try {
        const ast = babelParser.parse(code, {
            sourceType: "unambiguous",
            plugins: ["jsx", "typescript"],
        });

        const issues = [];
        traverse(ast, {
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