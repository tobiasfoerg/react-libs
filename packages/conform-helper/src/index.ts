import * as React from "react";
import type { Get } from "type-fest";

import { getFormElement, getPaths, isFieldElement, parse } from "@conform-to/dom";

type IsAny<T> = unknown extends T ? ([keyof T] extends [never] ? false : true) : false;

type ExcludeArrayKeys<T> = T extends ArrayLike<any> ? Exclude<keyof T, keyof any[]> : keyof T;

type PathImpl<T, Key extends keyof T> = Key extends string
	? IsAny<T[Key]> extends true
		? never
		: T[Key] extends Record<string, any>
		?
				| `${Key}.${PathImpl<T[Key], ExcludeArrayKeys<T[Key]>> & string}`
				| `${Key}.${ExcludeArrayKeys<T[Key]> & string}`
		: never
	: never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

type FieldPath<T> = keyof T extends string
	? Path<T> extends infer P
		? P extends string | keyof T
			? P
			: keyof T
		: keyof T
	: never;

type ParserFn<FieldValues> = (FormData: FormData) => FieldValues;

export function useWatch<
	FieldValues extends Record<string, any>,
	Path extends FieldPath<FieldValues> = FieldPath<FieldValues>,
>(
	ref: React.RefObject<HTMLFormElement>,
	path: Path,
	parseFn: ParserFn<FieldValues> = (formData) => parse(formData).payload as FieldValues,
) {
	function getSnapshot() {
		if (!ref.current) {
			return undefined;
		}

		const formData = new FormData(ref.current);
		const paths = getPaths(path);

		let current: any = parseFn(formData);
		while (paths.length > 0) {
			try {
				const path = paths.shift()!;
				current = current[path];
				if (!current) {
					return undefined;
				}
			} catch (error) {
				return undefined;
			}
		}
		return current as Get<FieldValues, Path>;
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
