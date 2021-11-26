import React from "react";
import { useDebounce } from "react-use";
import S from "./Input.styled";

type InputProps = {
  type: "text" | "number" | "email" | "tel";
  placeholder: string;
  value?: string;
  onChange?: (val: string) => void;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  const [_value, _setValue] = React.useState(value);

  React.useEffect(() => _setValue(value), [value]);

  useDebounce(() => onChange && onChange(_value ?? ""), 500, [_value]);

  return (
    <S.Input
      type={type}
      placeholder={placeholder}
      value={_value}
      onChange={(e) => _setValue(e.target.value ?? "")}
    />
  );
};

export default Input;
