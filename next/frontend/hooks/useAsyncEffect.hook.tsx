import React from "react";
import { useDeepCompareEffect } from "react-use";

export type TAsyncEffect =
  | ((mounted: () => boolean) => Promise<() => void>)
  | ((mounted: () => boolean) => Promise<void>);

const useAsyncEffect = (
  effect: TAsyncEffect,
  deps: React.DependencyList
): void => {
  useDeepCompareEffect(() => {
    let mounted = true;
    let destroyer: (() => void) | void;

    const checkIsMounted = () => mounted;

    effect(checkIsMounted).then((res) => {
      destroyer = res;
    });

    return () => {
      mounted = false;
      if (typeof destroyer === "function") destroyer();
    };
  }, [effect, ...deps]);
};

export default useAsyncEffect;
