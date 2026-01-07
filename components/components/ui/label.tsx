"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Label } from "radix-ui";
import * as React from "react";

import { cn } from "@/components/lib/utils";

const labelVariants = cva(
	"font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const LabelDemo = React.forwardRef<
	React.ElementRef<typeof Label.Root>,
	React.ComponentPropsWithoutRef<typeof Label.Root> &
		VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<Label.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
LabelDemo.displayName = "LabelDemo";

export { LabelDemo };
