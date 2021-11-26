import { TReduxFormPage } from "$/types/form.type";
import { copy } from "@/helpers/app.helper";
import { ApplicationFormActionType } from "../constants/ApplicationForm.constant";

export type TApplicationFormState = {
  institute_id: number | null;
  institute_name: string;
  course_id: number | null;
  course_name: string;
  fee_waiver_id: number | null;
  fee_waiver_name: string;
  level_name: string;
  category_name: string;

  email: string;

  currentPage: number;
  pages: TReduxFormPage[];
  preAppPages: TReduxFormPage[];
};

export type TApplicationFormAction = {
  type: string;
  payload: {
    institute_id?: number | null;
    institute_name?: string;
    course_id?: number | null;
    course_name?: string;
    fee_waiver_id?: number | null;
    fee_waiver_name?: string;
    level_name?: string;
    category_name?: string;

    email?: string;

    currentPage?: number;
    pages?: TReduxFormPage[];

    pageIdx?: number;
    sectionIdx?: number;
    rowIdx?: number;
    fieldIdx?: number;
    conditionIdx?: number;
    subformIdx?: number;
    subformFieldIdx?: number;

    values?: string[];
  };
};

const initState: TApplicationFormState = {
  institute_id: null,
  institute_name: "",
  course_id: null,
  course_name: "",
  fee_waiver_id: null,
  fee_waiver_name: "",
  level_name: "",
  category_name: "",

  email: "",

  currentPage: 0,
  pages: [],
  preAppPages: [],
};

const ApplicationFormReducer = (
  state: TApplicationFormState = initState,
  action: TApplicationFormAction
): TApplicationFormState => {
  if (!action.type || !action.payload) return { ...state };

  const {
    institute_id,
    institute_name,
    course_id,
    course_name,
    fee_waiver_id,
    fee_waiver_name,
    level_name,
    category_name,
    email,
    currentPage,
    pages,
    pageIdx,
    sectionIdx,
    rowIdx,
    fieldIdx,
    conditionIdx,
    subformIdx,
    subformFieldIdx,
    values,
  } = action.payload;

  switch (action.type) {
    case ApplicationFormActionType.INSTITUTE_ID:
      if (institute_id !== undefined) {
        return { ...state, institute_id };
      }
      break;

    case ApplicationFormActionType.INSTITUTE_NAME:
      if (institute_name !== undefined) {
        return { ...state, institute_name };
      }
      break;

    case ApplicationFormActionType.COURSE_NAME:
      if (course_name !== undefined) {
        return { ...state, course_name };
      }
      break;

    case ApplicationFormActionType.COURSE_ID:
      if (course_id !== undefined) {
        return { ...state, course_id };
      }
      break;

    case ApplicationFormActionType.FEE_WAIVER_ID:
      if (fee_waiver_id !== undefined) {
        return { ...state, fee_waiver_id };
      }
      break;

    case ApplicationFormActionType.FEE_WAIVER_NAME:
      if (fee_waiver_name !== undefined) {
        return { ...state, fee_waiver_name };
      }
      break;

    case ApplicationFormActionType.LEVEL_NAME:
      if (level_name !== undefined) {
        return { ...state, level_name };
      }
      break;

    case ApplicationFormActionType.CATEGORY_NAME:
      if (category_name !== undefined) {
        return { ...state, category_name };
      }
      break;

    case ApplicationFormActionType.EMAIL:
      if (email !== undefined) {
        return { ...state, email };
      }
      break;

    case ApplicationFormActionType.CURRENT_PAGE:
      if (currentPage !== undefined) {
        return { ...state, currentPage };
      }
      break;

    case ApplicationFormActionType.PRE_APP_PAGES:
      if (pages !== undefined) {
        return { ...state, preAppPages: copy(pages) };
      }
      break;

    case ApplicationFormActionType.INSTITUTE_PAGES:
      if (pages !== undefined) {
        return { ...state, pages: copy(pages) };
      }
      break;

    case ApplicationFormActionType.PAGE_NEXT: {
      const nextPage = state.currentPage + 1;
      if (nextPage <= state.pages.length - 1) {
        return { ...state, currentPage: nextPage };
      }
      break;
    }

    case ApplicationFormActionType.PAGE_BACK: {
      const prevPage = state.currentPage - 1;
      if (prevPage >= 0) {
        return { ...state, currentPage: prevPage };
      }
      break;
    }

    case ApplicationFormActionType.SUBFORM_ADD: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]?.subforms
        )
          break;

        const find = state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].subforms.find((subform) => subform.length !== 0);

        const Copy = copy(find ?? []);

        for (const field of Copy) field.values = [];

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].subforms.push(Copy);
        return { ...state };
      }
      break;
    }

    case ApplicationFormActionType.SUBFORM_REMOVE: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined &&
        subformIdx !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]?.subforms
        )
          break;

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].subforms[subformIdx] = [];
        return { ...state };
      }
      break;
    }

    case ApplicationFormActionType.CONDITION_SUBFORM_ADD: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined &&
        conditionIdx !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]?.conditions?.[conditionIdx]?.subforms
        )
          break;

        const find = state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].conditions[conditionIdx].subforms.find(
          (subform) => subform.length !== 0
        );

        const Copy = copy(find ?? []);
        for (const field of Copy) field.values = [];

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].conditions[conditionIdx].subforms.push(Copy);
        return { ...state };
      }
      break;
    }

    case ApplicationFormActionType.CONDITION_SUBFORM_REMOVE: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined &&
        conditionIdx !== undefined &&
        subformIdx !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]?.conditions?.[conditionIdx]?.subforms
        )
          break;

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].conditions[conditionIdx].subforms[subformIdx] = [];
        return { ...state };
      }
      break;
    }

    case ApplicationFormActionType.FIELD_VALUES: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined &&
        values !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]
        )
          break;

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].values = values;
        return { ...state };
      }
      break;
    }

    case ApplicationFormActionType.SUBFORM_VALUES: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined &&
        subformIdx !== undefined &&
        subformFieldIdx !== undefined &&
        values !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]?.subforms?.[subformIdx]?.[subformFieldIdx]
        )
          break;

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].subforms[subformIdx][subformFieldIdx].values = values;
        return { ...state };
      }
      break;
    }

    case ApplicationFormActionType.CONDITION_VALUES: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined &&
        conditionIdx !== undefined &&
        values !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]?.conditions?.[conditionIdx]
        )
          break;

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].conditions[conditionIdx].values = values;
        return { ...state };
      }
      break;
    }

    case ApplicationFormActionType.CONDITION_SUBFORM_VALUES: {
      if (
        pageIdx !== undefined &&
        sectionIdx !== undefined &&
        rowIdx !== undefined &&
        fieldIdx !== undefined &&
        conditionIdx !== undefined &&
        subformIdx !== undefined &&
        subformFieldIdx !== undefined &&
        values !== undefined
      ) {
        if (
          !state?.pages?.[pageIdx]?.sections?.[sectionIdx]?.fields?.[rowIdx]?.[
            fieldIdx
          ]?.conditions?.[conditionIdx]?.subforms?.[subformIdx]?.[
            subformFieldIdx
          ]
        )
          break;

        state.pages[pageIdx].sections[sectionIdx].fields[rowIdx][
          fieldIdx
        ].conditions[conditionIdx].subforms[subformIdx][
          subformFieldIdx
        ].values = values;
        return { ...state };
      }
      break;
    }
  }

  return state;
};

export default ApplicationFormReducer;
