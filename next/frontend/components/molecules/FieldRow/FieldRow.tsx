import { SearchResultApplicationFormField } from "$/types/form.type";
import FormContext from "@/contexts/Form.context";
import React from "react";
import Field from "../Field/Field";
import S from "./FieldRow.styled";

type FieldRowProps = {
  field1: SearchResultApplicationFormField | undefined;
  field2: SearchResultApplicationFormField | undefined;
  field1Optional: boolean;
  field2Optional: boolean;
};

const FieldRow: React.FC<FieldRowProps> = ({
  field1 = null,
  field2 = null,
  field1Optional = false,
  field2Optional = false,
}) => {
  const field1Full = !!field1?.field?.full_width;
  const field2Full = !!field2?.field?.full_width;

  const context = React.useContext(FormContext);

  return (
    <S.Row>
      {field1 && (
        <S.Col full_width={field1Full ? 1 : 0}>
          <FormContext.Provider value={{ ...context, fieldIdx: 0 }}>
            <Field field={field1} optional={field1Optional} />
          </FormContext.Provider>
        </S.Col>
      )}
      {field2 && (
        <S.Col full_width={field2Full ? 1 : 0}>
          <FormContext.Provider value={{ ...context, fieldIdx: 1 }}>
            <Field field={field2} optional={field2Optional} />
          </FormContext.Provider>
        </S.Col>
      )}
    </S.Row>
  );
};

export default FieldRow;
