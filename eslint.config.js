import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],

    plugins: {
      js,
    },

    extends: [
      "js/recommended",
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],

    languageOptions: {
      globals: globals.browser,

      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      /*
       * UNUSED VARIABLES
       */
      "no-unused-vars": "off",

      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      /*
       * GENERAL STRICTNESS
       */
      eqeqeq: ["error", "always"],

      curly: ["error", "all"],

      "no-var": "error",

      "prefer-const": "error",

      "no-debugger": "error",

      "no-console": "warn",

      "object-shorthand": ["error", "always"],

      "prefer-template": "error",

      /*
       * TYPESCRIPT STRICTNESS
       */
      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/no-floating-promises": "error",

      "@typescript-eslint/no-misused-promises": "error",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
]);
