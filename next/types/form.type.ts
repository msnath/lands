export type TApiFormPage = {
  name: string;
  sections: sresApplicationFormSection[];
};

export type sresApplicationFormField = {
  id: number;
  field?: SearchResultApplicationFormField;
  is_optional: boolean;
};

export type sresApplicationFormSection = {
  id: number;
  section?: SearchResultApplicationFormSection;
  fields: sresApplicationFormField[][];
};

export type SearchResultApplicationFormField =
  SearchResultApplicationFormFieldData & {
    subform_fields?: SearchResultApplicationFormFieldData[];
    conditions?: SearchResultApplicationFormCondition[];
    section?: { stats?: { count: number } };
  };

export type SearchResultApplicationFormSection = {
  section: sresApplicationFormComponentSection;
  field?: { stats?: { count: number } };
};

export type SearchResultApplicationFormFieldData = {
  field: sresApplicationFormComponentField;
  options_list?: sresOptionsList;
  levels?: sresLevel[];
};

export type SearchResultApplicationFormCondition =
  SearchResultApplicationFormFieldData & {
    condition: { value: string; conditional: string };
    subform_fields?: SearchResultApplicationFormFieldData[];
  };

export type sresApplicationFormComponentSection = {
  id: number;
  name: string;
  description: string;
};

export type sresOptionsList = {
  id?: number;
  name?: string;
  items: string[];
  table_name?: string;
};

export type sresApplicationFormComponentField = {
  id: number;
  name: string;
  type: {
    id: number;
    type: string;
  };
  full_width: boolean;

  details?: {
    description: string | null;
    placeholder: string | null;
    subform_is_repeatable: boolean;
    max_files_allowed: number;
    max_file_size: number;
  };
};

export type sresLevel = {
  id: number;
  name: string;
};

export type TReduxFormField = {
  name: string;
  type: string;
  description: string;
  options: string[];
  values: string[];
};

export type TReduxFormMainField = TReduxFormField & {
  width: boolean;
  optional: boolean;

  subforms: TReduxFormField[][];
  conditions: TReduxFormCondition[];
};

export type TReduxFormCondition = TReduxFormField & {
  condition: string;
  subforms: TReduxFormField[][];
};

export type TReduxFormSection = {
  name: string;
  description: string;

  fields: TReduxFormMainField[][];
};

export type TReduxFormPage = {
  name: string;
  description: string;
  sections: TReduxFormSection[];
};
