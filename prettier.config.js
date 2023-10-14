/** @type {import('prettier').Config} */
export default {
	arrowParens: "always",
	printWidth: 120,
	semi: true,
	singleQuote: false,
	tabWidth: 4,
	useTabs: true,
	overrides: [
		{
			files: ["*.yml", "*.yaml"],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
	plugins: ["prettier-plugin-packagejson", "prettier-plugin-tailwindcss"],
};
