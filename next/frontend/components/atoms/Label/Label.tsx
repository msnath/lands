import { TValidationResult } from "@/validators/form.validator";
import React from "react";
import SvgElem, { SvgElems } from "../SvgElem/SvgElem";
import S from "./Label.styled";

type LabelProps = {
  text: string;
  status?: TValidationResult;
  optional?: boolean;
};

const Label: React.FC<LabelProps> = ({ text, status, optional }) => {
  return (
    <S.Label>
      <S.Text>{text}</S.Text>
      {optional ? <S.Optional>optional</S.Optional> : null}
      {status === "COMPLETED" && <SvgElem svg={SvgElems.IconStatusCheck} />}
      {status === "MISSING_INFO" && <SvgElem svg={SvgElems.IconStatusCross} />}
    </S.Label>
  );
};

export default Label;
