import React from "react";

const useEventListener = <
  E extends HTMLElement,
  K extends keyof HTMLElementEventMap
>(
  ref: React.RefObject<E>,
  type: K,
  listener: (this: HTMLElement, e: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  React.useEffect(() => {
    const elem = ref.current;
    if (elem) elem.addEventListener(type, listener, options);
    return () => {
      if (elem) elem.removeEventListener(type, listener, options);
    };
  }, [ref, type, listener, options]);
};

export const useWindowEventListener = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, e: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  React.useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => {
      window.removeEventListener(type, listener, options);
    };
  }, [type, listener, options]);
};

export default useEventListener;
