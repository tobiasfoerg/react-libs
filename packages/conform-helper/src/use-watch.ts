import * as React from "react";
import type { Get } from "type-fest";

import type { Path } from "./types";
import { getFormElement, getPaths, isFieldElement, parse } from "@conform-to/dom";

export function useWatch<Output extends Record<string, any>, P extends Path<Output> = Path<Output>>(
	ref: React.RefObject<HTMLFormElement>,
	path: P,
	parseFn: (formData: FormData) => Output = (formData) => parse(formData).payload as Output,
) {
	function getSnapshot() {
		if (!ref.current) {
			return undefined;
		}

		const formData = new FormData(ref.current);
		const paths = getPaths(path);

		let current: any = parseFn(formData).payload;
		while (paths.length > 0) {
			const path = paths.shift()!;
			current = current[path];
			if (!current) {
				return undefined;
			}
		}
		return current as Get<Output, P>;
	}

	function subscribe(listen: () => void): () => void {
		function handleInput(event: Event) {
			const form = getFormElement(ref.current);
			const element = event.target;
			if (!isFieldElement(element) || element.form !== form || !element.name.startsWith(path)) {
				return;
			}
			listen();
		}

		document.addEventListener("input", handleInput);
		return () => {
			document.removeEventListener("input", handleInput);
		};
	}

	return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
