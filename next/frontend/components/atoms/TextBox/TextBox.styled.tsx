import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled, { css } from "styled-components";

type TextBoxProps = { pointer: bool };

const S = {
  TextBox: styled.div<TextBoxProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 3rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    border: 2px solid ${Colors.WhiteF0F0F0};
    background: ${Colors.WhiteFFFFFF};

    ${({ pointer }) =>
      pointer &&
      css`
        cursor: pointer;
      `}
  `,

  Text: styled.p`
    color: ${Colors.Black3B3B3C};
    font-family: Mulish;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
  `,

  Placeholder: styled.p`
    color: ${Colors.Grey8F8F90};
    font-family: Mulish;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
  `,
};

export default S;
