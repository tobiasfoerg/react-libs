import * as React from "react";

import resolveConfig from "tailwindcss/resolveConfig";
import type { Config } from "tailwindcss";

export function createBreakpoint<T extends Config>(config: T) {
	const resolvedConfig = resolveConfig(config);
	// @ts-expect-error
	const screens = resolvedConfig.theme?.screens;

	if (!screens) {
		throw new Error("Screens not found in Tailwind config. Please ensure that Tailwind is configured properly.");
	}

	function useBreakpoint(breakpoint: "sm" | "md" | "lg" | "xl" | "2xl") {
		const [getSnapshot, subscribe] = React.useMemo(() => {
			const mediaQueryList = matchMedia(`(min-width: ${screens![breakpoint]})`);

			return [
				() => mediaQueryList.matches,
				(listener: (ev: MediaQueryListEvent) => void) => {
					mediaQueryList.addEventListener("change", listener);
					return () => mediaQueryList.removeEventListener("change", listener);
				},
			];
		}, [matchMedia, breakpoint]);

		const match = React.useSyncExternalStore<boolean>(subscribe, getSnapshot);
		return match;
	}

	return { useBreakpoint };
}
