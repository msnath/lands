import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled, { css } from "styled-components";

type OptionProps = {
  checked: bool;
  hoverable: bool;
  pointer: bool;
  isPlaceholder: bool;
};

const S = {
  Option: styled.div<OptionProps>`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;

    & > p {
      color: ${({ checked, isPlaceholder }) =>
        checked
          ? Colors.Blue
          : isPlaceholder
          ? Colors.Grey8F8F90
          : Colors.Black3B3B3C} !important;
      font-family: Mulish;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.125rem;
      text-align: left;
    }

    & > div {
      margin-right: 0.5rem;
      min-width: 1.25rem;
      width: 1.25rem;
      max-width: 1.25rem;
    }

    ${({ hoverable }) =>
      hoverable &&
      css`
        &:hover {
          background: ${Colors.WhiteF0F0F0};
        }
      `};

    ${({ pointer }) =>
      pointer &&
      css`
        cursor: pointer;
      `};
  `,
};

export default S;
