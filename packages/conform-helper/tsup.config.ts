import { defineConfig } from "tsup";
import { modernConfig, legacyConfig } from "../../scripts/tsup.config";

export default defineConfig([
	modernConfig({ entry: ["src/*.ts"], external: ["react", "@conform-to/dom"] }),
	legacyConfig({ entry: ["src/*.ts"], external: ["react", "@conform-to/dom"] }),
]);
