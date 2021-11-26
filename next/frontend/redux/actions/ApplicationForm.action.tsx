import { TReduxFormPage } from "$/types/form.type";
import { ApplicationFormActionType } from "../constants/ApplicationForm.constant";
import { TApplicationFormAction } from "../reducers/ApplicationForm.reducer";

const ApplicationFormAction = {
  instituteId: (institute_id: number | null): TApplicationFormAction => ({
    type: ApplicationFormActionType.INSTITUTE_ID,
    payload: { institute_id },
  }),
  instituteName: (institute_name: string): TApplicationFormAction => ({
    type: ApplicationFormActionType.INSTITUTE_NAME,
    payload: { institute_name },
  }),
  courseId: (course_id: number | null): TApplicationFormAction => ({
    type: ApplicationFormActionType.COURSE_ID,
    payload: { course_id },
  }),
  courseName: (course_name: string): TApplicationFormAction => ({
    type: ApplicationFormActionType.COURSE_NAME,
    payload: { course_name },
  }),
  feeWaiverId: (fee_waiver_id: number | null): TApplicationFormAction => ({
    type: ApplicationFormActionType.FEE_WAIVER_ID,
    payload: { fee_waiver_id },
  }),
  feeWaiverName: (fee_waiver_name: string): TApplicationFormAction => ({
    type: ApplicationFormActionType.FEE_WAIVER_NAME,
    payload: { fee_waiver_name },
  }),
  levelName: (level_name: string): TApplicationFormAction => ({
    type: ApplicationFormActionType.LEVEL_NAME,
    payload: { level_name },
  }),
  categoryName: (category_name: string): TApplicationFormAction => ({
    type: ApplicationFormActionType.CATEGORY_NAME,
    payload: { category_name },
  }),
  email: (email: string): TApplicationFormAction => ({
    type: ApplicationFormActionType.EMAIL,
    payload: { email },
  }),

  currentPage: (currentPage: number): TApplicationFormAction => ({
    type: ApplicationFormActionType.CURRENT_PAGE,
    payload: { currentPage },
  }),
  preAppPages: (pages: TReduxFormPage[]): TApplicationFormAction => ({
    type: ApplicationFormActionType.PRE_APP_PAGES,
    payload: { pages },
  }),
  institutePages: (pages: TReduxFormPage[]): TApplicationFormAction => ({
    type: ApplicationFormActionType.INSTITUTE_PAGES,
    payload: { pages },
  }),

  Pagination: {
    next: (): TApplicationFormAction => ({
      type: ApplicationFormActionType.PAGE_NEXT,
      payload: {},
    }),
    prev: (): TApplicationFormAction => ({
      type: ApplicationFormActionType.PAGE_BACK,
      payload: {},
    }),
  },

  Page: (pageIdx: number) => ({
    Section: (sectionIdx: number) => ({
      Row: (rowIdx: number) => ({
        Field: (fieldIdx: number) => ({
          values: (values: string[]): TApplicationFormAction => ({
            type: ApplicationFormActionType.FIELD_VALUES,
            payload: {
              pageIdx,
              sectionIdx,
              rowIdx,
              fieldIdx,
              values,
            },
          }),

          subformAdd: (): TApplicationFormAction => ({
            type: ApplicationFormActionType.SUBFORM_ADD,
            payload: { pageIdx, sectionIdx, rowIdx, fieldIdx },
          }),

          subformRemove: (subformIdx: number): TApplicationFormAction => ({
            type: ApplicationFormActionType.SUBFORM_REMOVE,
            payload: { pageIdx, sectionIdx, rowIdx, fieldIdx, subformIdx },
          }),

          Subform: (subformIdx: number) => ({
            Field: (subformFieldIdx: number) => ({
              values: (values: string[]): TApplicationFormAction => ({
                type: ApplicationFormActionType.SUBFORM_VALUES,
                payload: {
                  pageIdx,
                  sectionIdx,
                  rowIdx,
                  fieldIdx,
                  subformIdx,
                  subformFieldIdx,
                  values,
                },
              }),
            }),
          }),

          Condition: (conditionIdx: number) => ({
            values: (values: string[]): TApplicationFormAction => ({
              type: ApplicationFormActionType.CONDITION_VALUES,
              payload: {
                pageIdx,
                sectionIdx,
                rowIdx,
                fieldIdx,
                conditionIdx,
                values,
              },
            }),

            subformAdd: (): TApplicationFormAction => ({
              type: ApplicationFormActionType.CONDITION_SUBFORM_ADD,
              payload: {
                pageIdx,
                sectionIdx,
                rowIdx,
                fieldIdx,
                conditionIdx,
              },
            }),

            subformRemove: (subformIdx: number): TApplicationFormAction => ({
              type: ApplicationFormActionType.CONDITION_SUBFORM_REMOVE,
              payload: {
                pageIdx,
                sectionIdx,
                rowIdx,
                fieldIdx,
                conditionIdx,
                subformIdx,
              },
            }),

            Subform: (subformIdx: number) => ({
              Field: (subformFieldIdx: number) => ({
                values: (values: string[]): TApplicationFormAction => ({
                  type: ApplicationFormActionType.CONDITION_SUBFORM_VALUES,
                  payload: {
                    pageIdx,
                    sectionIdx,
                    rowIdx,
                    fieldIdx,
                    conditionIdx,
                    subformIdx,
                    subformFieldIdx,
                    values,
                  },
                }),
              }),
            }),
          }),
        }),
      }),
    }),
  }),
};

export default ApplicationFormAction;
