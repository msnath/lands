import FormContext from "@/contexts/Form.context";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import React from "react";
import { useDeepCompareEffect } from "react-use";
import { useReduxDispatch } from "./useRedux.hook";

export const useUpdateForm = (
  newValues: string[],
  deps: React.DependencyList
) => {
  const {
    pageIdx,
    sectionIdx,
    rowIdx,
    fieldIdx,
    conditionIdx,
    subformIdx,
    subformFieldIdx,
  } = React.useContext(FormContext);

  const dispatch = useReduxDispatch();

  useDeepCompareEffect(() => {
    if (
      pageIdx !== null &&
      sectionIdx !== null &&
      rowIdx !== null &&
      fieldIdx !== null
    ) {
      if (
        conditionIdx !== null &&
        subformIdx !== null &&
        subformFieldIdx !== null
      ) {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .Condition(conditionIdx)
            .Subform(subformIdx)
            .Field(subformFieldIdx)
            .values(newValues)
        );
      } else if (conditionIdx !== null) {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .Condition(conditionIdx)
            .values(newValues)
        );
      } else if (subformIdx !== null && subformFieldIdx !== null) {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .Subform(subformIdx)
            .Field(subformFieldIdx)
            .values(newValues)
        );
      } else {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .values(newValues)
        );
      }
    }
  }, [newValues, ...deps]);
};

export const useUpdateSubform = () => {
  const { pageIdx, sectionIdx, rowIdx, fieldIdx, conditionIdx } =
    React.useContext(FormContext);
  const dispatch = useReduxDispatch();

  const onAddEntry = () => {
    if (
      pageIdx !== null &&
      sectionIdx !== null &&
      rowIdx !== null &&
      fieldIdx !== null
    ) {
      if (conditionIdx !== null) {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .Condition(conditionIdx)
            .subformAdd()
        );
      } else {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .subformAdd()
        );
      }
    }
  };

  const onRemoveEntry = (subformIdx: number) => {
    if (
      pageIdx !== null &&
      sectionIdx !== null &&
      rowIdx !== null &&
      fieldIdx !== null
    ) {
      if (conditionIdx !== null) {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .Condition(conditionIdx)
            .subformRemove(subformIdx)
        );
      } else {
        dispatch(
          ApplicationFormAction.Page(pageIdx)
            .Section(sectionIdx)
            .Row(rowIdx)
            .Field(fieldIdx)
            .subformRemove(subformIdx)
        );
      }
    }
  };

  return { onAddEntry, onRemoveEntry };
};

export default useUpdateForm;
