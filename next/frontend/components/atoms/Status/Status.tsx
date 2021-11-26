import React from "react";
import SvgElem, { SvgElems } from "../SvgElem/SvgElem";
import S from "./Status.styled";

export type StatusProps = {
  completed?: boolean;
  notStarted?: boolean;
  missingInfo?: boolean;
};

const getIcon = ({ completed, notStarted, missingInfo }: StatusProps) => {
  return completed
    ? SvgElems.IconStatusComplete
    : notStarted
    ? SvgElems.IconStatusNotStarted
    : missingInfo
    ? SvgElems.IconStatusMissingInfo
    : null;
};

type StatusTextProps = StatusProps & { mini?: boolean };

export const StatusText: React.FC<StatusTextProps> = ({
  completed,
  notStarted,
  missingInfo,
  mini,
}) => {
  const Icon = getIcon({ completed, notStarted, missingInfo });
  return Icon ? (
    <S.TextContainer
      mini={mini ? 1 : 0}
      completed={completed}
      notStarted={notStarted}
      missingInfo={missingInfo}
    >
      <S.Text
        completed={completed}
        notStarted={notStarted}
        missingInfo={missingInfo}
      >
        {completed ? "Completed" : missingInfo ? "Missing Info" : "Not Started"}
      </S.Text>
      <SvgElem svg={Icon} />
    </S.TextContainer>
  ) : null;
};

type StatusIconProps = StatusProps & { page: number };

export const StatusIcon: React.FC<StatusIconProps> = ({
  completed,
  notStarted,
  missingInfo,
  page,
}) => {
  const Icon = getIcon({ completed, notStarted, missingInfo });
  return (
    <S.PageContainer
      completed={completed}
      notStarted={notStarted}
      missingInfo={missingInfo}
    >
      <S.Page
        completed={completed}
        notStarted={notStarted}
        missingInfo={missingInfo}
      >
        <p>{page}</p>
        {Icon && <S.Svg svg={Icon} />}
      </S.Page>
    </S.PageContainer>
  );
};
