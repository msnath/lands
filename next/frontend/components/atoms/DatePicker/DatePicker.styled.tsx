import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  Container: styled.div`
    width: 100%;
  `,

  Header: styled.div`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1rem;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    background: ${Colors.WhiteFFFFFF};
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    cursor: pointer;

    &,
    & * {
      color: ${Colors.Black3B3B3C};
      font-family: Mulish;
      font-size: 0.875rem;
      font-weight: 600;
      text-align: left;
    }
  `,

  DatePicker: styled.div`
    margin-top: 0.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid ${Colors.Grey8F8F90};
    background: ${Colors.WhiteFFFFFF};

    z-index: 100;
  `,

  Body: styled.div`
    width: max-content;
  `,
};

export default S;
