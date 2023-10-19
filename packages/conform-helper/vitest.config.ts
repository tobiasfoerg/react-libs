import { defineProject } from "vitest/config";
import pkg from "./package.json" assert { type: "json" };

export default defineProject({
	test: {
		name: pkg.name,
		root: "./src",
		environment: "jsdom",
	},
});
