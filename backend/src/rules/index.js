// TODO: delete all rules and make architectural rules here not repeated rules

import { maxParamsRule } from "./maxParamsRule.js";
import { noAnonymousFunctionRule } from "./noAnonymousFunctionRule.js";
import { noConsoleLogRule } from "./noConsoleLogRule.js";
import { noDebuggerRule } from "./noDebuggerRule.js";
import { noEmptyFunctionRule } from './noEmptyFunctionRule.js'
import { noVarRule } from "./novarRule.js";
import { strictEqualityRule } from './strictEqualityRule.js'
import { unusedVariableRule } from "./unusedVariableRule.js";


export {
    maxParamsRule,
    noAnonymousFunctionRule,
    noConsoleLogRule,
    noDebuggerRule,
    noEmptyFunctionRule,
    noVarRule,
    strictEqualityRule,
    unusedVariableRule
}