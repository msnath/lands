import React from "react";
import SvgElem, { SvgElems } from "../SvgElem/SvgElem";
import S from "./TextBox.styled";

type TextBoxProps = {
  text: string;
  svg: SvgElems;
  placeholder?: string;
  pointer?: boolean;
};

const TextBox: React.FC<TextBoxProps> = ({
  text,
  svg,
  placeholder = "",
  pointer,
}) => {
  return (
    <S.TextBox pointer={pointer ? 1 : 0}>
      {text && <S.Text>{text}</S.Text>}
      {!text && <S.Placeholder>{placeholder}</S.Placeholder>}
      {svg && <SvgElem svg={svg} />}
    </S.TextBox>
  );
};

export default TextBox;
