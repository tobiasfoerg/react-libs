import { test, expect, type ComponentFixtures } from "@playwright/experimental-ct-react";
import * as React from "react";
import { TestForm } from "./TestForm";

test.describe("useWatch", () => {
	let component: Awaited<ReturnType<ComponentFixtures["mount"]>>;
	test.beforeEach(async ({ mount }) => {
		component = await mount(<TestForm path="email" />);
		const page = component.page();
		page.on("console", console.log);
	});

	test("should update on watched path changed", async () => {
		await component.getByTestId("name").fill("Learn React");
		await expect(component.getByTestId("watch")).toHaveText("");
		await component.getByTestId("email").fill("Learn React");
		await expect(component.getByTestId("watch")).toHaveText('"Learn React"');
	});
});
