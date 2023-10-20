import globals from "globals";
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const LEVEL = {
	OFF: 0,
	WARN: 1,
	ERROR: 2,
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	prettierConfig,
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
			"no-redeclare": LEVEL.OFF,
			"no-unused-vars": LEVEL.OFF,
			"@typescript-eslint/no-unused-vars": LEVEL.ERROR,
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			react: reactPlugin,
			"react-hooks": reactHooksPlugin,
		},
		settings: {
			react: {
				version: "detect",
			},
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
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
		},
	},
];
