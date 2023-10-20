import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../src";

describe("useLocalStorage<T>", () => {
	test("return undefinded when inital value not set", () => {
		const { result } = renderHook(() => useLocalStorage("test-1"));
		expect(result.current[0]).toBeUndefined();
	});
	test("return inital value", () => {
		const { result } = renderHook(() => useLocalStorage("test-2", "test"));
		expect(result.current[0]).toBe("test");
	});

	test("set value", () => {
		const { result } = renderHook(() => useLocalStorage<string>("test-3"));
		expect(result.current[0]).toBeUndefined();

		act(() => {
			result.current[1]("test");
		});

		expect(result.current[0]).toBe("test");
	});

	test("update value", () => {
		const { result } = renderHook(() => useLocalStorage<string>("test-4"));
		expect(result.current[0]).toBeUndefined();

		act(() => {
			result.current[1]("test");
		});

		act(() => {
			result.current[1]((prev) => prev + "-2");
		});

		expect(result.current[0]).toBe("test-2");
	});
});
