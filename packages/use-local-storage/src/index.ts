import * as React from "react";

declare global {
	interface WindowEventMap {
		localStorage: StorageEvent;
	}
}
export function useLocalStorage<T = undefined>(
	key: string,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];
export function useLocalStorage<T>(key: string, initialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>];
export function useLocalStorage<T>(
	key: string,
	initialValue?: T,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
	React.useEffect(() => {
		if (typeof window !== "undefined" && typeof initialValue !== "undefined") {
			setValue(initialValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function getSnapshot(): T | undefined {
		const item = window.localStorage.getItem(key);

		if (!item) {
			return initialValue;
		}

		try {
			return JSON.parse(item) as T;
		} catch (error) {
			return undefined;
		}
	}
	function getServerSnapshot(): T | undefined {
		return initialValue;
	}

	function subscribe(listen: () => void): () => void {
		function handleEvent(event: StorageEvent) {
			if (event.storageArea === window.localStorage || event.key === key) {
				listen();
			}
		}

		window.addEventListener("storage", handleEvent, { once: true });
		window.addEventListener("localStorage", handleEvent, { once: true });
		return () => {
			// @ts-expect-error: lib.dom.d.ts does not define same options as for addEventListener.
			window.removeEventListener("storage", handleEvent, { once: true });
			// @ts-expect-error: lib.dom.d.ts does not define same options as for addEventListener.
			window.removeEventListener("localStorage", handleEvent, { once: true });
		};
	}

	const value = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	function setValue(value: React.SetStateAction<T | undefined>) {
		if (typeof window == "undefined") {
			console.warn(`Tried setting key "${key}"" even though environment is not a client`);
		}

		try {
			const oldValue = getSnapshot();
			const newValue = value instanceof Function ? value(oldValue) : value;
			window.localStorage.setItem(key, JSON.stringify(newValue));
			window.dispatchEvent(
				new StorageEvent("localStorage", {
					key,
					oldValue: JSON.stringify(oldValue),
					newValue: JSON.stringify(newValue),
					storageArea: window.localStorage,
				}),
			);
		} catch (error) {
			console.warn(`Error setting key "${key}"":`, error);
		}
	}

	return [value, setValue];
}
