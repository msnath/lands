import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  Subforms: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,

  

  AddButton: styled.button`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1.5rem;
    align-items: center;
    justify-content: center;

    width: 100%;
    background: ${Colors.WhiteFFFFFF};
    border-radius: 0.75rem;
    border: 2px solid ${Colors.WhiteF0F0F0};
    padding: 0.75rem 1rem;

    & > p {
      color: ${Colors.Black3B3B3C};
      font-family: Montserrat;
      font-size: 1rem;
      font-weight: 600;
      text-align: left;
    }
  `,
};

export default S;
