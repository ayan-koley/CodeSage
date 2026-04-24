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
      "no-console": "error",
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
      "no-console": "error",
    }
  },
  {
    files: ["**/*.ts"],
    ...tseslint.configs.recommended
  }
]);
