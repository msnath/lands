import { SearchResultApplicationFormFieldData } from "$/types/form.type";
import Divider from "@/components/atoms/Divider/Divider.styled";
import SvgElem, { SvgElems } from "@/components/atoms/SvgElem/SvgElem";
import FormContext from "@/contexts/Form.context";
import useAccordian from "@/hooks/useAccordian.hook";
import React from "react";
import Field from "../Field/Field";
import S from "./Subform.styled";

type SubformProps = {
  name: string;
  fields: SearchResultApplicationFormFieldData[];
  onRemove: () => void;
};

const Subform: React.FC<SubformProps> = ({ name, fields, onRemove }) => {
  const { open, refHeader, refContent } = useAccordian<HTMLDivElement>(true);

  const context = React.useContext(FormContext);

  return (
    <S.Subform>
      <S.Header ref={refHeader}>
        <S.Icon>
          <SvgElem svg={SvgElems.IconSubform} />
        </S.Icon>

        <S.Container>
          <S.Title>{name}</S.Title>
        </S.Container>

        <S.Chevron open={open ? 1 : 0}>
          <SvgElem svg={SvgElems.IconChevronUp} />
        </S.Chevron>
      </S.Header>

      <S.Body ref={refContent}>
        {fields.map((field, i) => (
          <FormContext.Provider
            key={i}
            value={{ ...context, subformFieldIdx: i }}
          >
            <Field
              field={{ ...field, conditions: [], subform_fields: [] }}
              optional={false}
            />
            <Divider height={1.5} />
          </FormContext.Provider>
        ))}

        <S.RemoveButton onClick={onRemove}>
          <SvgElem svg={SvgElems.IconDelete} />
          <p>Remove entry</p>
        </S.RemoveButton>

        {open && <Divider height={1.5} />}
      </S.Body>
    </S.Subform>
  );
};

export default Subform;
