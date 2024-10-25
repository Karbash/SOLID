import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // Specify the TypeScript files
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // Add your custom rules here
    },
  },
];
