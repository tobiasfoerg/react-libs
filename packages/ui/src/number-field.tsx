import * as React from "react";
import { Button, Group, Input, NumberField } from "react-aria-components";
import { conform, useInputEvent, type FieldConfig } from "@conform-to/react";
import { composeRefs } from "../../compose-refs/src/compose-refs";

declare module "react" {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
	): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const _NumberField = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentPropsWithoutRef<"input">>(
	(props, forwardedRef) => {
		const ref = React.useRef<HTMLInputElement>(null);

		const control = useInputEvent({
			ref: ref,
		});
		return (
			<NumberField
				onBlur={control.blur}
				onFocus={control.focus}
				onChange={(v) => control.change(String(v))}
				defaultValue={stringToNumber(props.defaultValue)}
			>
				<Group>
					<Input {...props} ref={composeRefs(forwardedRef, ref)} />
					<Button slot="increment">+</Button>
					<Button slot="decrement">+</Button>
				</Group>
			</NumberField>
		);
	},
);

function stringToNumber(value: React.ComponentPropsWithoutRef<"input">["defaultValue"]): number | undefined {
	switch (typeof value) {
		case "number":
			return value;
		case "string":
			const num = Number(value);
			return isNaN(num) ? undefined : num;
		default:
			return undefined;
	}
}

export { _NumberField as NumberField };



function TEst(){

    const config = {} as FieldConfig<number>;

    return <div>
        <_NumberField {...conform.input(config)}/>
    </div>
}