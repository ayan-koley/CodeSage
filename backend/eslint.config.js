import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    // files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    files: ["**/*.js"],
    ...js.configs.recommended, 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node
    }, 
    rules: {
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
      // "promise/no-nesting": "warn", // requires plugin
      "no-implicit-globals": "error"
    }
  },
  {
    files: ["**/*.cjs"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      eqeqeq: "error",
    }
  },
  {
    files: ["**/*.ts"],
    ...tseslint.configs.recommended
  }
]);
