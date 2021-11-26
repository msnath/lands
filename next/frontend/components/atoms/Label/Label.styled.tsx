import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  Label: styled.label`
    display: grid;
    grid-template-columns: 1fr auto auto;
    column-gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,

  Text: styled.p`
    color: ${Colors.Black3B3B3C};
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    margin: 0.375rem 0.25rem;
    white-space: pre-wrap;
  `,

  Optional: styled.p`
    background: ${Colors.Grey8F8F90};
    border-radius: 1.25rem;
    padding: 0.25rem 0.5rem;

    color: ${Colors.WhiteFFFFFF};
    font-family: Mulish;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-align: left;
  `,
};

export default S;
