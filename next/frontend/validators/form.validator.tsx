import {
  TReduxFormField,
  TReduxFormMainField,
  TReduxFormPage,
  TReduxFormSection,
} from "$/types/form.type";

export type TValidationResult =
  | "NOT_STARTED"
  | "MISSING_INFO"
  | "COMPLETED"
  | "UNKNOWN";

export const filterValues = (values: string[]) => {
  return values.filter((v) => v !== "");
};

// check if completed
export const isCompletedForm = (pages: TReduxFormPage[]) => {
  for (const page of pages) {
    if (!isCompletedPage(page)) return false;
  }
  return true;
};

export const isCompletedPage = (page: TReduxFormPage) => {
  for (const section of page.sections) {
    if (!isCompletedSection(section)) return false;
  }
  return true;
};

export const isCompletedSection = (section: TReduxFormSection) => {
  for (const row of section.fields) {
    for (const field of row) {
      if (!isCompletedMainField(field)) {
        return false;
      }
    }
  }
  return true;
};

export const isCompletedMainField = (field: TReduxFormMainField) => {
  const values = filterValues(field.values);
  if (field.optional && values.length === 0) {
    return true;
  }

  if ((field.optional && values.length > 0) || !field.optional) {
    if (!isCompletedField(field)) return false;

    for (const subformFields of field.subforms) {
      for (const subformField of subformFields) {
        if (!isCompletedField(subformField)) return false;
      }
    }

    for (const con of field.conditions) {
      if (field.values.includes(con.condition)) {
        const f = { ...con, width: false, optional: false, conditions: [] };
        if (!isCompletedMainField(f)) return false;
      }
    }
  }

  return true;
};

export const isCompletedField = (field: TReduxFormField) => {
  const res = validateField(field.type, field.values);
  return res.result;
};

export const validateField = (type: string, values: string[]) => {
  const EmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const PhoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i;

  const _value = values[0] ? values[0] : null;
  const _values = filterValues(values);

  switch (type) {
    case "Short Text":
      if (!_value) {
        return { result: false, message: "Short Text is empty" };
      }
      break;

    case "Long Text":
      if (!_value) {
        return { result: false, message: "Long Text is empty" };
      }
      break;

    case "Email":
      if (!_value) {
        return { result: false, message: "Email is empty" };
      } else if (!EmailRegex.test(_value)) {
        return { result: false, message: "Email is invalid" };
      }
      break;

    case "Number":
      if (!_value) {
        return { result: false, message: "Number is empty" };
      } else if (typeof +_value !== "number" || isNaN(+_value)) {
        return { result: false, message: "Number is invalid" };
      }
      break;

    case "Phone Number":
      if (!_value) {
        return { result: false, message: "Phone Number is empty" };
      } else if (!PhoneRegex.test(_value)) {
        return { result: false, message: "Phone Number is invalid" };
      }
      break;

    case "Date Picker":
      if (!_value || new Date(_value) === null) {
        return { result: false, message: "Date is empty" };
      }
      break;

    case "Single Choice":
      if (_values.length === 0) {
        return { result: false, message: "Single Choice is empty" };
      }
      break;

    case "Multiple Choice":
      if (_values.length === 0) {
        return { result: false, message: "Multiple Choice is empty" };
      }
      break;

    case "File Upload":
      if (_values.length === 0)
        return { result: false, message: "File Upload is empty" };
      break;
  }

  return { result: true, message: "" };
};

// check if 'is started'
export const isStartedPage = (page: TReduxFormPage) => {
  for (const section of page.sections) {
    if (isStartedSection(section)) return true;
  }
  return false;
};

export const isStartedSection = (section: TReduxFormSection) => {
  for (const row of section.fields) {
    for (const field of row) {
      const values = filterValues(field.values);
      if (values.length > 0) return true;

      for (const subform of field.subforms) {
        for (const subformField of subform) {
          if (subformField.values.length > 0) return true;
        }
      }
    }
  }
  return false;
};

// get status
export const getStatusPage = (
  page: TReduxFormPage | undefined
): TValidationResult => {
  if (!page) return "NOT_STARTED";

  const isStarted = isStartedPage(page);
  const isCompleted = isCompletedPage(page);

  if (isCompleted) return "COMPLETED";
  if (isStarted && !isCompleted) return "MISSING_INFO";
  if (!isStarted) return "NOT_STARTED";

  return "UNKNOWN";
};

export const getStatusSection = (
  section: TReduxFormSection
): TValidationResult => {
  if (!section) return "NOT_STARTED";

  const isStarted = isStartedSection(section);
  const isCompleted = isCompletedSection(section);

  if (isCompleted) return "COMPLETED";
  if (isStarted && !isCompleted) return "MISSING_INFO";
  if (!isStarted) return "NOT_STARTED";

  return "UNKNOWN";
};
