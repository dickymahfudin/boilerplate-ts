import globals from "globals";
import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Translate ESLintRC-style configs into flat configs.
const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);

const compat = new FlatCompat({
  baseDirectory: _dirname,
  recommendedConfig: pluginJs.configs.recommended
});

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  ...compat.config({
    env: { node: true },
    ignorePatterns: ["dist/**/*", "eslint.config.mjs"],
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json"
    },
    plugins: ["@typescript-eslint", "import", "prettier"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "no-underscore-dangle": "off",
      "no-console": "off",
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "prettier/prettier": ["error"],
      "no-useless-constructor": "off",
      "no-empty-function": ["error", { allow: ["constructors"] }]
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    }
  })
];
