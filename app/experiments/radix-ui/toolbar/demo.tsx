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
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  display: "flex",
  minWidth: "max-content",
  padding: 10,
  width: "100%",
});

const itemStyles = {
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}`, position: "relative" },
  "&:hover": { backgroundColor: violet.violet3, color: violet.violet11 },
  alignItems: "center",
  all: "unset",
  borderRadius: 4,
  color: mauve.mauve11,
  display: "inline-flex",
  flex: "0 0 auto",
  fontSize: 13,
  height: 25,
  justifyContent: "center",
  lineHeight: 1,
  padding: "0 5px",
};

const StyledButton = styled(
  ToolbarPrimitive.Button,
  {
    ...itemStyles,
    backgroundColor: "#2563eb",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
  { "&:hover": { backgroundColor: "rgb(37, 99, 235, 0.5)", color: "white" } }
);

const StyledLink = styled(
  ToolbarPrimitive.Link,
  {
    ...itemStyles,
    alignItems: "center",
    backgroundColor: "transparent",
    color: mauve.mauve11,
    display: "inline-flex",
    justifyContent: "center",
  },
  { "&:hover": { backgroundColor: "transparent", cursor: "pointer" } }
);

const StyledSeparator = styled(ToolbarPrimitive.Separator, {
  backgroundColor: mauve.mauve6,
  margin: "0 10px",
  width: 1,
});

const StyledToggleGroup = styled(ToolbarPrimitive.ToggleGroup, {
  borderRadius: 4,
  display: "inline-flex",
});

const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
  ...itemStyles,
  "&:first-child": { marginLeft: 0 },
  "&[data-state=on]": {
    backgroundColor: "rgb(37, 99, 235, 0.5)",
    color: "rgb(37, 99, 235, 0.5)",
  },
  backgroundColor: "white",
  boxShadow: 0,
  marginLeft: 2,
});

// Exports
const Toolbar = StyledToolbar;
const ToolbarButton = StyledButton;
const ToolbarSeparator = StyledSeparator;
const ToolbarLink = StyledLink;
const ToolbarToggleGroup = StyledToggleGroup;
const ToolbarToggleItem = StyledToggleItem;

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
