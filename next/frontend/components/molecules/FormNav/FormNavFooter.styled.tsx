import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  FormNavFooter: styled.div`
    position: sticky;
    bottom: 0;

    background: ${Colors.WhiteFFFFFF};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-top: 2px solid ${Colors.WhiteF0F0F0};
  `,

  PrevButton: styled.button`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    row-gap: 0.25rem;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 3.25rem;
    max-width: 15rem;

    background: ${Colors.WhiteFAFAFA};
    border-radius: 0.75rem;
    padding: 0.5rem;

    &:disabled {
      cursor: default;
      & * {
        color: ${Colors.GreyBCC5D3};
        stroke: ${Colors.GreyBCC5D3};
      }
    }
  `,

  NextButton: styled.button`
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 1rem;
    row-gap: 0.25rem;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 3.25rem;
    max-width: 15rem;

    background: ${Colors.WhiteFAFAFA};
    border-radius: 0.75rem;
    padding: 0.5rem;
    margin: 0.5rem;

    &:disabled {
      cursor: default;
      & * {
        color: ${Colors.GreyBCC5D3};
        stroke: ${Colors.GreyBCC5D3};
      }
    }
  `,

  SubmitButton: styled.button`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 0.25rem;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 3.25rem;
    max-width: 15rem;

    background: ${Colors.Blue};
    border-radius: 0.75rem;
    padding: 0.5rem;
    margin: 0.5rem;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: ${Colors.BlueLight};
      }
    }

    &:disabled {
      background: ${Colors.GreyBCC5D3};
      cursor: default;
      & * {
        color: ${Colors.WhiteFFFFFF};
      }
    }
  `,

  GreyText: styled.p`
    color: ${Colors.GreyBCC5D3};
    font-family: Mulish;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-align: left;
  `,

  Text: styled.p`
    color: ${Colors.Black3B3B3C};
    font-family: Montserrat;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
  `,

  WhiteText: styled.p`
    color: ${Colors.WhiteFFFFFF};
    font-family: Montserrat;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: center;
  `,

  PrevIcon: styled.div`
    grid-column: 1/2;
    grid-row: 1/3;
    & > svg {
      transform: rotateZ(180deg);
    }
  `,

  NextIcon: styled.div`
    grid-column: 2/3;
    grid-row: 1/3;
  `,
};

export default S;
