import React from "react";
import { useDebounce } from "react-use";
import S from "./TextArea.styled";

type TextAreaProps = {
  placeholder: string;
  value?: string;
  onChange?: (val: string) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [_value, _setValue] = React.useState(value);

  React.useEffect(() => _setValue(value), [value]);

  useDebounce(() => onChange && onChange(_value ?? ""), 500, [_value]);

  return (
    <S.TextArea
      placeholder={placeholder}
      value={_value}
      onChange={(e) => _setValue(e.target.value ?? "")}
    />
  );
};

export default TextArea;
