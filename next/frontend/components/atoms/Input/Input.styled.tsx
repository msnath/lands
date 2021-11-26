import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  Input: styled.input`
    background: ${Colors.WhiteFFFFFF};

    color: ${Colors.Black3B3B3C};
    font-family: Mulish;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;

    border-radius: 0.75rem;
    border: 2px solid ${Colors.WhiteF0F0F0};
    padding: 0.75rem 1rem;
    width: 100%;

    &::placeholder {
      color: ${Colors.Grey8F8F90};
      font-family: Mulish;
      font-size: 0.875rem;
      font-weight: 600;
      text-align: left;
    }
  `,
};

export default S;
