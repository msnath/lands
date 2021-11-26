import React from "react";
import useEventListener from "./useEventListener.hook";

const useAccordian = <T extends HTMLElement>(
  initOpen = false,
  deps: React.DependencyList = []
) => {
  const [open, setOpen] = React.useState(initOpen);
  const [height, setHeight] = React.useState<number>(0);

  const refHeader = React.useRef<T>(null);
  const refContent = React.useRef<HTMLDivElement>(null);

  const onToggle = () => {
    if (refHeader.current) refHeader.current.click();
  };

  React.useEffect(
    () => {
      const content = refContent.current;

      if (content) {
        content.style.overflow = "hidden";
        content.style.display = open ? "block" : "none";
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refContent.current, open, height, ...deps]
  );

  const toggleCollapse = () => {
    setOpen((v) => !v);
    setHeight(refContent.current?.scrollHeight ?? 0);
  };

  useEventListener(refHeader, "click", toggleCollapse);

  return { refHeader, refContent, open, height, onToggle };
};

export default useAccordian;
