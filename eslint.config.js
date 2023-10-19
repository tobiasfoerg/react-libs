import globals from "globals";
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import pretierConfig from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactConfigRecommended from "eslint-plugin-react/configs/recommended.js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	pretierConfig,
	reactConfigRecommended,
	{
		files: ["**/*.js"],
		languageOptions: {
			parserOptions: {
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es6,
				...globals.commonjs,
			},
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			"@typescript-eslint": typescriptPlugin,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: "./tsconfig.json",
				sourceType: "module",
				ecmaVersion: 2020,
			},
		},
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["error"],
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			reactPlugin,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},
		rules: {
			"react/jsx-uses-react": "error",
			"react/jsx-uses-vars": "error",
		},
	},
];
