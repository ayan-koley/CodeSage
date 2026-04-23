import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ...js.configs.recommended
  },
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
      eqeqeq: "error"
    }
  },
  {
    files: ["**/*.cjs"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node
    }
  },
  {
    files: ["**/*.ts"],
    ...tseslint.config.recommended
  }
]);
