import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import plugin, { parser } from "typescript-eslint";

export default [
  { ignores: ["node_modules/", "dist/", "dist-ssr/", "coverage/"] },
  prettierPlugin,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
    },
    plugins: {
      "@typescript-eslint": plugin,
      import: importPlugin,
    },
    rules: {
      ...plugin.configs.recommendedTypeChecked.rules,
      "prettier/prettier": "error",
      "import/order": "warn",
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/namespace": "off",
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
    },
  },
];
