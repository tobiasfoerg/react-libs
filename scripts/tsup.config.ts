import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";
import type { Options, defineConfig } from "tsup";

export function modernConfig(opts: Options): Options {
	return {
		entry: opts.entry,
		format: ["cjs", "esm"],
		target: ["chrome91", "firefox90", "edge91", "safari15", "ios15", "opera77"],
		outDir: "dist/modern",
		dts: true,
		sourcemap: true,
		clean: true,
		esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: "js" })],
	};
}

export function legacyConfig(opts: Options): Options {
	return {
		entry: opts.entry,
		format: ["cjs", "esm"],
		target: ["es2020", "node16"],
		outDir: "dist/legacy",
		dts: true,
		sourcemap: true,
		clean: true,
		esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: "js" })],
	};
}
