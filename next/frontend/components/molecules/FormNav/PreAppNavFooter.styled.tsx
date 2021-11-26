import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  PreAppNavFooter: styled.div`
    position: sticky;
    bottom: 0;

    display: grid;
    row-gap: 0.5rem;
    align-items: center;
    justify-items: center;

    width: 100%;
    background: ${Colors.WhiteFFFFFF};
    padding: 1rem;
    border-top: 2px solid ${Colors.WhiteF0F0F0};
  `,

  FastTrackButton: styled.button`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    align-items: center;

    background: ${Colors.Blue};
    border-radius: 0.75rem;
    padding: 0.5rem 1.5rem;

    &:active {
      background: ${Colors.BlueDark};
    }
    
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: ${Colors.BlueDark};
      }
    }

    &:disabled {
      background: ${Colors.GreyBCC5D3};
      cursor: default;
    }

    & > div > p:nth-child(1) {
      color: ${Colors.WhiteFFFFFF};
      font-family: Montserrat;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
    }
    & > div > p:nth-child(2) {
      color: ${Colors.WhiteFAFAFA};
      font-family: Mulish;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-align: center;
    }
  `,

  Texts: styled.div`
    display: flex;
    flex-direction: row;
  `,

  GreyText: styled.p`
    color: ${Colors.Grey6C6C6D};
    font-family: Montserrat;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: center;
  `,

  BlueSpan: styled.span`
    color: ${Colors.Blue};
    font-family: Montserrat;
    text-decoration: underline;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: center;

    cursor: pointer;
  `,
};

export default S;
