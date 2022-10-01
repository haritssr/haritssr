import { useRef } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

export function Button(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`p-2 rounded-full ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-offset-2 ring-purple-600" : ""
      }`}
    >
      {props.children}
    </button>
  );
}
