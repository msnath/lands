import { SearchResultApplicationFormField } from "$/types/form.type";
import DatePicker from "@/components/atoms/DatePicker/DatePicker";
import FileUpload from "@/components/atoms/FileUpload/FileUpload";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import PhoneNumber from "@/components/atoms/PhoneNumber/PhoneNumber";
import TextArea from "@/components/atoms/TextArea/TextArea";
import FormContext from "@/contexts/Form.context";
import useAsyncEffect from "@/hooks/useAsyncEffect.hook";
import useOptionsListTable from "@/hooks/useOptionsListTable.hook";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux.hook";
import { useUpdateForm } from "@/hooks/useUpdateForm.hook";
import ApplicationFormAction from "@/redux/actions/ApplicationForm.action";
import ApiRoutes from "@/routes/ApiRoutes.route";
import {
  filterValues,
  TValidationResult,
  validateField,
} from "@/validators/form.validator";
import { useRouter } from "next/dist/client/router";
import React from "react";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import SingleChoice from "../SingleChoice/SingleChoice";
import Subforms from "../Subform/Subforms";
import S from "./Field.styled";

type FieldProps = {
  field: SearchResultApplicationFormField;
  optional: boolean;
};

const Field: React.FC<FieldProps> = ({ field, optional }) => {
  const router = useRouter();
  const [values, setValues] = React.useState<string[]>([""]);

  const { institute_id, course_id } = router.query;

  const { pageIdx } = React.useContext(FormContext);
  const page = useReduxSelector(
    (state) => state.ApplicationForm.pages[pageIdx ?? 0]
  );
  const dispatch = useReduxDispatch();

  // Prefill Pre-App Level and Course
  useAsyncEffect(async () => {
    if (
      page?.name === "Pre-App" &&
      typeof institute_id === "string" &&
      typeof course_id === "string" &&
      institute_id &&
      course_id &&
      (values[0] === "" || values[0] === undefined)
    ) {
      switch (field.options_list?.table_name) {
        case "Course": {
          const res = await ApiRoutes.courses({
            format: ["fee_waiver_details"],
            filter: {
              institutes: { ids: [+institute_id] },
              courses: { ids: [+course_id] },
            },
          });

          const course = res[0]?.course;
          setValues([course.name]);
          dispatch(ApplicationFormAction.courseId(course.id ?? null));
          dispatch(ApplicationFormAction.courseName(course.name ?? ""));

          const feeWaiver = res[0]?.fee_waiver?.fee_waivers?.[0];
          dispatch(ApplicationFormAction.feeWaiverId(feeWaiver?.id ?? null));
          dispatch(ApplicationFormAction.feeWaiverName(feeWaiver?.name ?? ""));
          break;
        }

        case "EducationLevel": {
          const res = await ApiRoutes.courses({
            format: ["course_details"],
            filter: {
              institutes: { ids: [+institute_id] },
              courses: { ids: [+course_id] },
            },
          });
          if (res.length === 1) {
            const level_name = res[0].course.details?.level.name ?? "";
            setValues([level_name]);
            dispatch(ApplicationFormAction.levelName(level_name));
          }
          break;
        }

        case "EducationCategory": {
          const res = await ApiRoutes.courses({
            format: ["course_details"],
            filter: {
              institutes: { ids: [+institute_id] },
              courses: { ids: [+course_id] },
            },
          });
          if (res.length === 1) {
            const category_name = res[0].course.details?.category.name ?? "";
            setValues([category_name]);
            dispatch(ApplicationFormAction.categoryName(category_name));
          }
          break;
        }
      }
    }
  }, [
    page?.name,
    institute_id,
    course_id,
    values[0],
    field.options_list?.table_name,
  ]);

  useUpdateForm([...values], [values]);

  const [tableValues, setTableValue] = useOptionsListTable(
    field.options_list?.table_name
  );

  const status: TValidationResult =
    filterValues(values).length > 0
      ? validateField(field.field.type.type ?? "", values).result
        ? "COMPLETED"
        : "MISSING_INFO"
      : "NOT_STARTED";

  switch (field?.field?.type?.type) {
    case "Short Text":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <Input
            type="text"
            placeholder={field.field.details?.placeholder || "Enter a value"}
            value={values[0]}
            onChange={(v) => setValues([v])}
          />
        </S.Field>
      );

    case "Long Text":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <TextArea
            placeholder={field.field.details?.placeholder || "Enter a value"}
            value={values[0]}
            onChange={(v) => setValues([v])}
          />
        </S.Field>
      );

    case "Email":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <Input
            type="email"
            placeholder={field.field.details?.placeholder || "Enter an email"}
            value={values[0]}
            onChange={(v) => setValues([v])}
          />
        </S.Field>
      );

    case "Number":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <Input
            type="number"
            placeholder={field.field.details?.placeholder || "Enter a number"}
            value={values[0]}
            onChange={(v) => setValues([v])}
          />
        </S.Field>
      );

    case "Phone Number":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <PhoneNumber
            placeholder={
              field.field.details?.placeholder || "Enter a phone no."
            }
            onChange={(v) => setValues([v])}
          />
        </S.Field>
      );

    case "Date Picker":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <DatePicker onChange={(date) => setValues([date.toUTCString()])} />
        </S.Field>
      );

    case "Single Choice":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <SingleChoice
            placeholder={field.field.details?.placeholder || "-Select-"}
            options={tableValues ?? field.options_list?.items ?? []}
            conditions={field.conditions}
            values={values}
            onChange={(newValues) => {
              setValues(newValues);
              setTableValue(newValues[0] ?? "");
            }}
          />
        </S.Field>
      );

    case "Multiple Choice":
      return (
        <S.Field>
          <Label status={status} text={field.field.name} optional={optional} />
          <MultipleChoice
            placeholder={field.field.details?.placeholder || "-Select-"}
            options={tableValues ?? field.options_list?.items ?? []}
            conditions={field.conditions}
            values={values}
            onChange={setValues}
          />
        </S.Field>
      );

    case "File Upload":
      return (
        <S.Field>
          <Label
            status={status}
            text={
              field.field.name +
              (field.field.details && field.field.details.max_files_allowed > 1
                ? ` (max ${field.field.details?.max_files_allowed} files)`
                : "")
            }
            optional={optional}
          />

          <FileUpload
            size={field.field.details?.max_file_size ?? 5}
            count={field.field.details?.max_files_allowed ?? 1}
          />
        </S.Field>
      );

    case "Subform":
      return (
        <S.Field>
          <Subforms
            repeatable={!!field.field.details?.subform_is_repeatable}
            name={field.field.name}
            fields={field.subform_fields ?? []}
          />
        </S.Field>
      );

    default:
      return null;
  }
};

export default Field;
