import * as React from "react";
import { useWatch } from "./use-watch";

export function TestForm({ path }: { path: string }) {
	const formRef = React.useRef<HTMLFormElement>(null);

	const watch = useWatch(
		formRef,
		path as any,
		(f) => Object.fromEntries(f.entries()) as { email: string; name: string },
	);

	return (
		<form ref={formRef}>
			<input data-testid="name" type="text" name="name" />
			<input data-testid="email" type="text" name="email" />
			<input type="submit" />
			<span data-testid="watch">{JSON.stringify(watch)}</span>
		</form>
	);
}
