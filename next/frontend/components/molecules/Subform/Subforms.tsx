import { SearchResultApplicationFormFieldData } from "$/types/form.type";
import SvgElem, { SvgElems } from "@/components/atoms/SvgElem/SvgElem";
import FormContext from "@/contexts/Form.context";
import { useUpdateSubform } from "@/hooks/useUpdateForm.hook";
import React from "react";
import Subform from "./Subform";
import S from "./Subforms.styled";

type SubformsProps = {
  repeatable: boolean;
  name: string;
  fields: SearchResultApplicationFormFieldData[];
};

const Subforms: React.FC<SubformsProps> = ({ repeatable, name, fields }) => {
  const [subforms, setSubforms] = React.useState<(1 | 0)[]>([1]);

  const context = React.useContext(FormContext);
  const { onAddEntry, onRemoveEntry } = useUpdateSubform();

  const onAdd = () => {
    setSubforms([...subforms, 1]);
    onAddEntry();
  };

  const onRemove = (idx: number) => {
    const visibleSubforms = subforms.filter((s) => s === 1);
    if (visibleSubforms.length > 1) {
      subforms[idx] = 0;
      setSubforms([...subforms]);
      onRemoveEntry(idx);
    }
  };

  return (
    <S.Subforms>
      {subforms.map((visible, i) =>
        visible ? (
          <FormContext.Provider key={i} value={{ ...context, subformIdx: i }}>
            <Subform
              name={name}
              fields={fields ?? []}
              onRemove={() => onRemove(i)}
            />
          </FormContext.Provider>
        ) : null
      )}

      {repeatable && (
        <S.AddButton onClick={onAdd}>
          <SvgElem svg={SvgElems.IconAddCircle} />
          <p>Add another entry</p>
        </S.AddButton>
      )}
    </S.Subforms>
  );
};

export default Subforms;
