import { useRef } from "react";
import { mergeProps, useButton, useFocusRing } from "react-aria";

export function Button(props) {
	const ref = useRef();
	const { buttonProps } = useButton(props, ref);
	const { focusProps, isFocusVisible } = useFocusRing();
	return (
		<button
			type="button"
			{...mergeProps(buttonProps, focusProps)}
			ref={ref}
			className={`rounded-full p-2 ${props.isDisabled ? "text-gray-400" : ""} ${
				props.isDisabled ? "" : "hover:bg-violet-100 active:bg-violet-200"
			} outline-hidden ${
				isFocusVisible ? "ring-2 ring-purple-600 ring-offset-2" : ""
			}`}
		>
			{props.children}
		</button>
	);
}
