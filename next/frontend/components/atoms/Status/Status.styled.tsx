import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled, { css } from "styled-components";
import SvgElem from "../SvgElem/SvgElem";
import { StatusProps } from "./Status";

const TextContainer = styled.div<StatusProps & { mini: bool }>`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 0.75rem;

  width: max-content;
  border-radius: 0.75rem;
  ${({ mini }) =>
    mini
      ? css`
          padding: 0.125rem 0.25rem 0.125rem 0.5rem;
        `
      : css`
          padding: 0.25rem 0.75rem;
        `};

  background: ${({ completed, missingInfo }) =>
    completed
      ? Colors.Green56D39E
      : missingInfo
      ? Colors.RedFF4C4C
      : Colors.WhiteFFFFFF};

  border: 2px solid
    ${({ completed, missingInfo }) =>
      completed
        ? Colors.Green96E4C3
        : missingInfo
        ? Colors.RedFF7A7A
        : Colors.GreyDBDFE7};
`;

const Text = styled.p<StatusProps>`
  color: ${({ notStarted }) =>
    notStarted ? Colors.Black3B3B3C : Colors.WhiteFFFFFF};
  font-family: Mulish;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0.02em;
  text-align: left;
`;

const Page = styled.div<StatusProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  border: 0.125rem solid ${Colors.WhiteFAFAFA};
  background: ${({ completed, missingInfo }) =>
    completed
      ? Colors.Green56D39E
      : missingInfo
      ? Colors.RedFF4C4C
      : Colors.WhiteFAFAFA};

  transition: none;

  & > p {
    color: ${({ completed, missingInfo }) =>
      completed || missingInfo ? Colors.WhiteFFFFFF : Colors.Black3B3B3C};
    font-family: Montserrat;
    font-size: 0.875rem;
    font-weight: 700;
    text-align: center;
  }
`;

const PageContainer = styled.div<StatusProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  border: 0.125rem solid ${Colors.WhiteFAFAFA};
  background: ${Colors.WhiteFFFFFF};

  overflow: visible;
  transition: none;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ completed, missingInfo }) =>
        completed
          ? Colors.Green96E4C3
          : missingInfo
          ? Colors.RedFF7A7A
          : Colors.GreyDBDFE7};

      ${Page} {
        background: ${({ completed, missingInfo }) =>
          completed
            ? Colors.Green96E4C3
            : missingInfo
            ? Colors.RedFF7A7A
            : Colors.GreyDBDFE7};

        & path {
          fill: ${({ completed, missingInfo }) =>
            completed
              ? Colors.Green96E4C3
              : missingInfo
              ? Colors.RedFF7A7A
              : Colors.GreyDBDFE7};
        }
      }
    }
  }

  &:active {
    background: ${({ completed, missingInfo }) =>
      completed
        ? Colors.Green56D39E
        : missingInfo
        ? Colors.RedFF4C4C
        : Colors.WhiteFFFFFF};

    ${Page} {
      background: ${({ completed, missingInfo }) =>
        completed
          ? Colors.Green56D39E
          : missingInfo
          ? Colors.RedFF4C4C
          : Colors.WhiteFAFAFA};
      border: 0.125rem solid
        ${({ completed, missingInfo }) =>
          completed
            ? Colors.Green56D39E
            : missingInfo
            ? Colors.RedFF4C4C
            : Colors.WhiteFAFAFA};

      & path {
        fill: ${({ completed, missingInfo }) =>
          completed
            ? Colors.Green56D39E
            : missingInfo
            ? Colors.RedFF4C4C
            : Colors.GreyDBDFE7};
      }
    }
  }
`;

const Svg = styled(SvgElem)`
  position: absolute;
  top: -0.625rem;
  right: -0.625rem;

  width: 1rem;
  height: 1rem;
  transition: none;

  z-index: 1;
`;

const S = { TextContainer, Text, PageContainer, Page, Svg };

export default S;
