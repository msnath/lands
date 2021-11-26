import { SearchResultApplicationFormCondition } from "$/types/form.type";
import Backdrop, { useBackdrop } from "@/components/atoms/Backdrop/Backdrop";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import Divider from "@/components/atoms/Divider/Divider.styled";
import Dropdown from "@/components/atoms/Dropdown/Dropdown";
import DropdownModal from "@/components/atoms/Dropdown/DropdownModal";
import Input from "@/components/atoms/Input/Input";
import { SvgElems } from "@/components/atoms/SvgElem/SvgElem";
import TextBox from "@/components/atoms/TextBox/TextBox";
import FormContext from "@/contexts/Form.context";
import { filterValues } from "@/validators/form.validator";
import React from "react";
import Field from "../Field/Field";
import S from "./MultipleChoice.styled";

type SingleChoiceProps = {
  placeholder: string;
  options: string[];
  conditions?: SearchResultApplicationFormCondition[];
  values: string[];
  onChange: (values: string[]) => void;
};

const SingleChoice: React.FC<SingleChoiceProps> = ({
  placeholder,
  options,
  conditions = [],
  values,
  onChange,
}) => {
  values = filterValues(values);

  const [search, setSearch] = React.useState("");
  const { focused, setFocused, props } = useBackdrop();

  const context = React.useContext(FormContext);

  const toggleSelected = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  const selectedDisplay =
    values.length === 0
      ? ""
      : values.length === 1
      ? values[0]
      : `${values.length} selected`;

  const Options = options.map((option, i) =>
    option.toLowerCase().includes(search.toLowerCase()) ? (
      <Checkbox
        key={i}
        text={option}
        checked={values.includes(option)}
        onClick={() => toggleSelected(option)}
      />
    ) : null
  );

  const Conditions = conditions.map(
    (f, i) =>
      values.includes(f.condition.value) && (
        <React.Fragment key={i}>
          <Divider height={1.5} />
          <FormContext.Provider value={{ ...context, conditionIdx: i }}>
            <Field key={i} field={f} optional={false} />
          </FormContext.Provider>
        </React.Fragment>
      )
  );

  if (options.length === 0) {
    return (
      <S.Simple>
        <S.Placeholder>No options found</S.Placeholder>
      </S.Simple>
    );
  } else if (options.length <= 2) {
    return (
      <>
        <S.Simple>{Options}</S.Simple>
        {Conditions}
      </>
    );
  } else {
    return (
      <>
        <S.Container>
          <Dropdown focused={focused} onChangeFocus={setFocused}>
            <TextBox
              pointer
              text={selectedDisplay}
              placeholder={placeholder}
              svg={SvgElems.IconTriangleDown}
            />
            <Backdrop {...props}>
              <DropdownModal>
                {options.length > 10 && (
                  <S.Input>
                    <Input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={setSearch}
                    />
                  </S.Input>
                )}
                {Options}
              </DropdownModal>
            </Backdrop>
          </Dropdown>
        </S.Container>
        {Conditions}
      </>
    );
  }
};

export default SingleChoice;
