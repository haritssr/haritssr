"use client";

import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { Toolbar as ToolbarPrimitive } from "radix-ui";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

const toolbarItemClassName =
  "inline-flex h-[25px] flex-[0_0_auto] appearance-none items-center justify-center rounded border-0 px-[5px] font-[inherit] text-[13px] leading-none outline-hidden focus:relative focus:shadow-[0_0_0_2px_#c2b5f5]";

const toolbarItemHoverClassName = "hover:bg-[#f4f0fe] hover:text-[#6550b9]";

const toolbarToggleItemClassName = `${toolbarItemClassName} ${toolbarItemHoverClassName} bg-white shadow-none data-[state=on]:bg-blue-600/50 data-[state=on]:text-blue-600/50`;

export default function RadixToolbarDemo() {
  return (
    <>
      <SubTitle>
        A container for grouping a set of controls, such as buttons, toggle
        groups or dropdown menus.
      </SubTitle>
      <SourceCodeLink />

      <div className="w-full overflow-x-auto p-1">
        <ToolbarPrimitive.Root
          aria-label="Formatting options"
          className="flex w-full min-w-max rounded-md bg-white p-2.5 shadow-[0_2px_10px_rgb(0_0_0_/_0.5)]"
        >
          <ToolbarPrimitive.ToggleGroup
            aria-label="Text formatting"
            className="inline-flex rounded"
            type="multiple"
          >
            <ToolbarPrimitive.ToggleItem
              aria-label="Bold"
              className={`${toolbarToggleItemClassName} ml-0 first:ml-0`}
              value="bold"
            >
              <FontBoldIcon />
            </ToolbarPrimitive.ToggleItem>
            <ToolbarPrimitive.ToggleItem
              aria-label="Italic"
              className={`${toolbarToggleItemClassName} ml-0.5 first:ml-0`}
              value="italic"
            >
              <FontItalicIcon />
            </ToolbarPrimitive.ToggleItem>
            <ToolbarPrimitive.ToggleItem
              aria-label="Strike through"
              className={`${toolbarToggleItemClassName} ml-0.5 first:ml-0`}
              value="strikethrough"
            >
              <StrikethroughIcon />
            </ToolbarPrimitive.ToggleItem>
          </ToolbarPrimitive.ToggleGroup>
          <ToolbarPrimitive.Separator className="mx-2.5 w-px bg-[#dbd8e0]" />
          <ToolbarPrimitive.ToggleGroup
            aria-label="Text alignment"
            className="inline-flex rounded"
            defaultValue="center"
            type="single"
          >
            <ToolbarPrimitive.ToggleItem
              aria-label="Left aligned"
              className={`${toolbarToggleItemClassName} ml-0 first:ml-0`}
              value="left"
            >
              <TextAlignLeftIcon />
            </ToolbarPrimitive.ToggleItem>
            <ToolbarPrimitive.ToggleItem
              aria-label="Center aligned"
              className={`${toolbarToggleItemClassName} ml-0.5 first:ml-0`}
              value="center"
            >
              <TextAlignCenterIcon />
            </ToolbarPrimitive.ToggleItem>
            <ToolbarPrimitive.ToggleItem
              aria-label="Right aligned"
              className={`${toolbarToggleItemClassName} ml-0.5 first:ml-0`}
              value="right"
            >
              <TextAlignRightIcon />
            </ToolbarPrimitive.ToggleItem>
          </ToolbarPrimitive.ToggleGroup>
          <ToolbarPrimitive.Separator className="mx-2.5 w-px bg-[#dbd8e0]" />
          <ToolbarPrimitive.Link
            className={`${toolbarItemClassName} mr-2.5 bg-transparent text-[#65636d] no-underline hover:cursor-pointer hover:bg-transparent hover:text-[#6550b9]`}
            href="#"
            target="_blank"
          >
            Edited 2 hours ago
          </ToolbarPrimitive.Link>
          <ToolbarPrimitive.Button
            className={`${toolbarItemClassName} ml-auto bg-blue-600 px-2.5 text-white hover:bg-blue-600/50 hover:text-white`}
          >
            Share
          </ToolbarPrimitive.Button>
        </ToolbarPrimitive.Root>
      </div>
    </>
  );
}
