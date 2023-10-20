import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		watch: false,
		environment: "jsdom",
		setupFiles: ["../../scripts/setup-tests.ts"],
	},
});
