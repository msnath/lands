import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  Subform: styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 1rem 0rem;
  `,

  Header: styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 0rem;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    min-height: 2.75rem;
    height: max-content;
    background: ${Colors.WhiteF0F0F0};
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    border: 0.125rem solid ${Colors.WhiteF0F0F0};
    overflow: hidden;

    cursor: pointer;
  `,

  Icon: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 2.75rem;
    min-height: 2.75rem;
    max-height: 100%;
    padding: 0rem 0.5rem;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 1rem;
  `,

  Title: styled.h2`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    width: max-content;

    color: ${Colors.Black3B3B3C};
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  `,

  Chevron: styled.button<{ open: bool }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    height: 1.5rem;
    background: ${Colors.Black3B3B3C};
    border: 0.125rem solid ${Colors.Grey6C6C6D};
    margin-right: 1rem;

    border-radius: 5rem;

    transform: rotateZ(${(props) => (props.open ? "0deg" : "180deg")});
    transition: all 300ms ease;
  `,

  Body: styled.div`
    display: grid;
    row-gap: 1.5rem;

    background: ${Colors.WhiteFAFAFA};
    padding: 0.5rem 0.5rem 0rem 0.5rem;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border: 0.125rem solid ${Colors.WhiteF0F0F0};
    border-top: none;
    overflow: hidden;

    transition: all 300ms ease;

    @media only screen and (min-width: 48rem) {
      padding: 0.5rem 1.5rem 0rem 1.5rem;
    }
  `,

  RemoveButton: styled.button`
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
