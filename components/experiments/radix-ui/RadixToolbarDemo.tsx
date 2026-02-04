"use client";

import { blackA, mauve, violet } from "@radix-ui/colors";
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import { Toolbar as ToolbarPrimitive } from "radix-ui";

import SubTitle from "@/components/SubTitle";

const StyledToolbar = styled(ToolbarPrimitive.Root, {
  display: "flex",
  padding: 10,
  width: "100%",
  minWidth: "max-content",
  borderRadius: 6,
  backgroundColor: "white",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const itemStyles = {
  all: "unset",
  flex: "0 0 auto",
  color: mauve.mauve11,
  height: 25,
  padding: "0 5px",
  borderRadius: 4,
  display: "inline-flex",
  fontSize: 13,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { backgroundColor: violet.violet3, color: violet.violet11 },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${violet.violet7}` },
};

const StyledButton = styled(
  ToolbarPrimitive.Button,
  {
    ...itemStyles,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
    backgroundColor: "#2563eb",
  },
  { "&:hover": { color: "white", backgroundColor: "rgb(37, 99, 235, 0.5)" } }
);

const StyledLink = styled(
  ToolbarPrimitive.Link,
  {
    ...itemStyles,
    backgroundColor: "transparent",
    color: mauve.mauve11,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  { "&:hover": { backgroundColor: "transparent", cursor: "pointer" } }
);

const StyledSeparator = styled(ToolbarPrimitive.Separator, {
  width: 1,
  backgroundColor: mauve.mauve6,
  margin: "0 10px",
});

const StyledToggleGroup = styled(ToolbarPrimitive.ToggleGroup, {
  display: "inline-flex",
  borderRadius: 4,
});

const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
  ...itemStyles,
  boxShadow: 0,
  backgroundColor: "white",
  marginLeft: 2,
  "&:first-child": { marginLeft: 0 },
  "&[data-state=on]": {
    backgroundColor: "rgb(37, 99, 235, 0.5)",
    color: "rgb(37, 99, 235, 0.5)",
  },
});

// Exports
export const Toolbar = StyledToolbar;
export const ToolbarButton = StyledButton;
export const ToolbarSeparator = StyledSeparator;
export const ToolbarLink = StyledLink;
export const ToolbarToggleGroup = StyledToggleGroup;
export const ToolbarToggleItem = StyledToggleItem;

export default function RadixToolbarDemo() {
  return (
    <>
      <SubTitle>
        A container for grouping a set of controls, such as buttons, toggle
        groups or dropdown menus.
      </SubTitle>

      <div className="w-full overflow-x-auto p-1">
        <Toolbar aria-label="Formatting options">
          <ToolbarToggleGroup aria-label="Text formatting" type="multiple">
            <ToolbarToggleItem aria-label="Bold" value="bold">
              <FontBoldIcon />
            </ToolbarToggleItem>
            <ToolbarToggleItem aria-label="Italic" value="italic">
              <FontItalicIcon />
            </ToolbarToggleItem>
            <ToolbarToggleItem
              aria-label="Strike through"
              value="strikethrough"
            >
              <StrikethroughIcon />
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
          <ToolbarSeparator />
          <ToolbarToggleGroup
            aria-label="Text alignment"
            defaultValue="center"
            type="single"
          >
            <ToolbarToggleItem aria-label="Left aligned" value="left">
              <TextAlignLeftIcon />
            </ToolbarToggleItem>
            <ToolbarToggleItem aria-label="Center aligned" value="center">
              <TextAlignCenterIcon />
            </ToolbarToggleItem>
            <ToolbarToggleItem aria-label="Right aligned" value="right">
              <TextAlignRightIcon />
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
          <ToolbarSeparator />
          <ToolbarLink css={{ marginRight: 10 }} href="#" target="_blank">
            Edited 2 hours ago
          </ToolbarLink>
          <ToolbarButton css={{ marginLeft: "auto" }}>Share</ToolbarButton>
        </Toolbar>
      </div>
    </>
  );
}
