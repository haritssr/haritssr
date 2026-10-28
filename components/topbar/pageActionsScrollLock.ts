function preventBackgroundScroll(event: TouchEvent | WheelEvent) {
  if (event.ctrlKey || ("touches" in event && event.touches.length > 1)) {
    return;
  }
  const scroller =
    event.target instanceof Element
      ? event.target.closest<HTMLElement>("[data-page-actions-scroll]")
      : null;
  if (scroller && scroller.scrollHeight > scroller.clientHeight) {
    return;
  }
  if (event.cancelable) {
    event.preventDefault();
  }
}

export function lockPageActionsBackground(doc: Document) {
  const root = doc.documentElement;
  const previous = root.dataset.pageActionsOpen;
  root.dataset.pageActionsOpen = "";

  doc.addEventListener("touchmove", preventBackgroundScroll, {
    passive: false,
  });
  doc.addEventListener("wheel", preventBackgroundScroll, { passive: false });
  return () => {
    doc.removeEventListener("touchmove", preventBackgroundScroll);
    doc.removeEventListener("wheel", preventBackgroundScroll);
    if (previous === undefined) {
      delete root.dataset.pageActionsOpen;
    } else {
      root.dataset.pageActionsOpen = previous;
    }
  };
}
