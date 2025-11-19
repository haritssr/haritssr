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
			className={`p-2 rounded-full ${props.isDisabled ? "text-gray-400" : ""} ${
				!props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
			} outline-hidden ${
				isFocusVisible ? "ring-2 ring-offset-2 ring-purple-600" : ""
			}`}
		>
			{props.children}
		</button>
	);
}
