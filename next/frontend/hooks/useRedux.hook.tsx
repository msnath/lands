import ReduxStore, { TReduxDispatch, TReduxState } from "@/redux/store/store";
import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useReduxStore = (initState: TReduxState) => {
  const store = React.useMemo(() => ReduxStore.init(initState), [initState]);
  return store;
};

export const useReduxSelector: TypedUseSelectorHook<TReduxState> = useSelector;

export const useReduxDispatch = () => useDispatch<TReduxDispatch>();
