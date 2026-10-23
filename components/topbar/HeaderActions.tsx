"use client";

import { memo, useEffect, useRef } from "react";

import useArticleContentsNavigation from "@/components/article/useArticleContentsNavigation";
import useArticleOutline from "@/components/article/useArticleOutline";

import TopBarActionMenu from "./TopBarActionMenu";
import TopBarContents from "./TopBarContents";
import { useGlobalSearch } from "./TopBarSearch";

interface HeaderActionsProps {
  pathname: string;
  compact: boolean;
  topBarHeight: number;
}

const GROUP_CLASS = "flex shrink-0 items-center justify-end gap-0 sm:gap-4";

const HeaderActions = memo((props: HeaderActionsProps) => {
  const isNestedRoute = props.pathname.split("/").filter(Boolean).length > 1;
  return isNestedRoute ? (
    <NestedHeaderActions {...props} />
  ) : (
    <div className={GROUP_CLASS}>
      <TopBarActionMenu pathname={props.pathname} compact={props.compact} />
    </div>
  );
});

HeaderActions.displayName = "HeaderActions";

export default HeaderActions;

function NestedHeaderActions({
  pathname,
  compact,
  topBarHeight,
}: HeaderActionsProps) {
  const mainRef = useRef<HTMLElement>(null);
  const { openSearch } = useGlobalSearch();
  useEffect(() => {
    mainRef.current = document.querySelector<HTMLElement>("#main-content");
  }, []);
  const navigation = useArticleContentsNavigation(1);
  const outline = useArticleOutline(
    mainRef,
    "Contents",
    navigation.onOutlineChange
  );
  const visible = outline !== null && outline.sections.length > 0;

  return (
    <div className={GROUP_CLASS}>
      <TopBarActionMenu
        compact={compact}
        pathname={pathname}
        onSearch={(trigger) => {
          if (navigation.open) {
            navigation.runAfterClose(() => {
              openSearch(trigger);
            });
          } else {
            openSearch(trigger);
          }
        }}
      />
      {visible ? (
        <TopBarContents
          outline={outline}
          navigation={navigation}
          topBarHeight={topBarHeight}
        />
      ) : null}
    </div>
  );
}
