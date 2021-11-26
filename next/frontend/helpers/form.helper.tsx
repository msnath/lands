import {
  SearchResultApplicationFormField,
  sresApplicationFormField,
  TApiFormPage,
  TReduxFormCondition,
  TReduxFormField,
  TReduxFormPage,
  TReduxFormSection,
} from "$/types/form.type";
import { TNextApiFileUpload } from "$/types/api.type";
import { copy } from "./app.helper";

export const checkFieldHasLevel = (
  field: SearchResultApplicationFormField,
  level_name: string | null
) => {
  // null is meant for Pre-App (basically ignore level_name)
  if (level_name === null) return true;
  const found = (field.levels ?? []).find((l) => l.name === level_name);
  return !!found;
};

export const formatFieldToRedux = (
  field: sresApplicationFormField | undefined,
  level_name: string | null
) => {
  return field?.field && checkFieldHasLevel(field.field, level_name)
    ? {
        name: field.field.field.name ?? "",
        type: field.field.field.type.type ?? "",
        description: field.field.field.details?.description ?? "",
        options: field.field.options_list?.items ?? [],
        values: [],

        width: !!field.field.field.full_width,
        optional: !!field.is_optional,

        subforms: [
          (field.field.subform_fields ?? [])
            .filter((f) => checkFieldHasLevel(f, level_name))
            .map(
              (sub): TReduxFormField => ({
                name: sub.field.name ?? "",
                type: sub.field.type.type ?? "",
                description: sub.field.details?.description ?? "",
                options: sub.options_list?.items ?? [],
                values: [],
              })
            ),
        ],

        conditions: (field.field.conditions ?? [])
          .filter((f) => checkFieldHasLevel(f, level_name))
          .map(
            (con): TReduxFormCondition => ({
              condition: con.condition.value ?? "",
              name: con.field.name ?? "",
              type: con.field.type.type ?? "",
              description: con.field.details?.description ?? "",
              options: con.options_list?.items ?? [],
              subforms: [
                (con.subform_fields ?? [])
                  .filter((f) => checkFieldHasLevel(f, level_name))
                  .map(
                    (conSub): TReduxFormField => ({
                      name: conSub.field.name ?? "",
                      type: conSub.field.type.type ?? "",
                      description: conSub.field.details?.description ?? "",
                      options: conSub.options_list?.items ?? [],
                      values: [],
                    })
                  ),
              ],
              values: [],
            })
          ),
      }
    : undefined;
};

export const formatField = (
  field: sresApplicationFormField | undefined,
  level_name: string | null
): sresApplicationFormField | null => {
  return field?.field && checkFieldHasLevel(field.field, level_name)
    ? {
        ...field,
        field: {
          ...field.field,
          subform_fields: (field.field.subform_fields ?? []).filter((f) =>
            checkFieldHasLevel(f, level_name)
          ),
          conditions: (field.field.conditions ?? []).map((f) => ({
            ...f,
            subform_fields: (f.subform_fields ?? []).filter((f) =>
              checkFieldHasLevel(f, level_name)
            ),
          })),
        },
      }
    : null;
};

export const formatPagesToRedux = (
  pages: TApiFormPage[],
  level_name: string | null
) => {
  const reduxPages: TReduxFormPage[] = [];

  for (const page of pages) {
    const formattedPage: TReduxFormPage = {
      name: page.name,
      description: "",
      sections: page.sections.map(
        (section): TReduxFormSection => ({
          name: section.section?.section.name ?? "",
          description: section.section?.section.description ?? "",
          fields: section.fields.map((row) => {
            const _row = [];
            const rowItem1 = formatFieldToRedux(row[0], level_name);
            const rowItem2 = formatFieldToRedux(row[1], level_name);

            if (rowItem1) _row.push(rowItem1);
            if (rowItem2) _row.push(rowItem2);
            return _row;
          }),
        })
      ),
    };

    reduxPages.push(formattedPage);
  }

  return reduxPages;
};

export const formatPages = (
  pages: TApiFormPage[],
  level_name: string | null
) => {
  const newPages: TApiFormPage[] = pages.map((page) => ({
    ...page,
    sections: page.sections.map((section) => ({
      ...section,
      fields: section.fields.map((row) => {
        const _row = [];
        const rowItem1 = formatField(row[0], level_name);
        const rowItem2 = formatField(row[1], level_name);

        if (rowItem1) _row.push(rowItem1);
        if (rowItem2) _row.push(rowItem2);
        return _row;
      }),
    })),
  }));

  return newPages;
};

const newFileValues = (uploads: TNextApiFileUpload[], values: string[]) => {
  const newValues: string[] = [];
  for (const value of values)
    for (const upload of uploads)
      if (upload.id === value) newValues.push(upload.url);
  return newValues;
};

export const updateFilesToS3Url = (
  uploads: TNextApiFileUpload[],
  pages: TReduxFormPage[]
) => {
  const copiedPages = copy(pages);

  for (const page of copiedPages) {
    for (const section of page.sections) {
      for (const row of section.fields) {
        for (const field of row) {
          if (field.type === "File Upload")
            field.values = newFileValues(uploads, field.values);

          for (const subform of field.subforms) {
            for (const subField of subform) {
              if (subField.type === "File Upload")
                subField.values = newFileValues(uploads, subField.values);
            }
          }

          for (const conField of field.conditions) {
            if (conField.type === "File Upload")
              conField.values = newFileValues(uploads, conField.values);

            for (const subform of conField.subforms) {
              for (const conSubField of subform) {
                if (conSubField.type === "File Upload")
                  conSubField.values = newFileValues(
                    uploads,
                    conSubField.values
                  );
              }
            }
          }
        }
      }
    }
  }

  return copiedPages;
};
