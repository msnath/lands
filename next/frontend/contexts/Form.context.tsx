import React from "react";

export type TFormContext = {
  pageIdx: number | null;
  sectionIdx: number | null;
  rowIdx: number | null;
  fieldIdx: number | null;

  subformIdx: number | null;
  subformFieldIdx: number | null;
  conditionIdx: number | null;
};

export const initFormContext = (): TFormContext => ({
  pageIdx: null,
  sectionIdx: null,
  rowIdx: null,
  fieldIdx: null,
  conditionIdx: null,
  subformIdx: null,
  subformFieldIdx: null,
});

const FormContext = React.createContext<TFormContext>(initFormContext());

export default FormContext;
