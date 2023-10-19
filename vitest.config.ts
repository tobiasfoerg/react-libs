import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		watch: false,
		coverage: {
            all: true,
			provider: "istanbul",
			include: ["packages/**/src/**/*.ts"],
            exclude: ["**/dist", "**/coverage"]
		},
	},
});
