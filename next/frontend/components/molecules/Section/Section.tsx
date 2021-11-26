import Divider from "@/components/atoms/Divider/Divider.styled";
import { StatusText } from "@/components/atoms/Status/Status";
import SvgElem, { SvgElems } from "@/components/atoms/SvgElem/SvgElem";
import useAccordian from "@/hooks/useAccordian.hook";
import { Colors } from "@/styles/app.styled";
import { TValidationResult } from "@/validators/form.validator";
import React from "react";
import { useEffectOnce } from "react-use";
import S from "./Section.styled";

type SectionProps = {
  position: number;
  visible: boolean;
  name: string;
  status: TValidationResult;
};

const Section: React.FC<SectionProps> = ({
  position,
  visible,
  name,
  status,
  children,
}) => {
  const { open, refHeader, refContent, onToggle } =
    useAccordian<HTMLDivElement>(true);

  useEffectOnce(() => {
    if (position === 0 && !open) onToggle();
  });

  return (
    <S.Section visible={visible ? 1 : 0}>
      <S.Header ref={refHeader}>
        <S.Position>{position + 1}</S.Position>

        <S.Container>
          <S.Title>{name}</S.Title>
          {status === "NOT_STARTED" && <StatusText mini notStarted />}
          {status === "MISSING_INFO" && <StatusText mini missingInfo />}
          {status === "COMPLETED" && <StatusText mini completed />}
        </S.Container>

        <S.Chevron open={open ? 1 : 0}>
          <SvgElem svg={SvgElems.IconChevronUp} />
        </S.Chevron>
      </S.Header>

      <S.Body ref={refContent}>
        {children}
        {open && <Divider height={0.5} />}
      </S.Body>
      {!open && (
        <S.BottomDivider
          color={
            status === "COMPLETED"
              ? Colors.Green56D39E
              : status === "MISSING_INFO"
              ? Colors.RedFF4C4C
              : Colors.WhiteFAFAFA
          }
        />
      )}
    </S.Section>
  );
};

export default Section;
