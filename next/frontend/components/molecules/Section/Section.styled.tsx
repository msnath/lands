import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

type SectionProps = { visible: bool };

type BorderProps = { color: string };

const S = {
  Section: styled.section<SectionProps>`
    display: flex;
    flex-direction: column;

    padding: 0.25rem;

    display: ${({ visible }) => (visible ? "block" : "none")};

    @media only screen and (min-width: 48rem) {
      padding: 1rem;
    }
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
    background: ${Colors.Black23272B};
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    border: 0.125rem solid ${Colors.WhiteFAFAFA};
    overflow: hidden;

    cursor: pointer;
  `,

  Position: styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 2.75rem;
    min-height: 2.75rem;
    height: 100%;
    max-height: 100%;
    background: ${Colors.Black3B3B3C};
    padding: 0rem 0.5rem;

    color: ${Colors.WhiteFFFFFF};
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
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

    color: ${Colors.WhiteFFFFFF};
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
    border: 0.125rem solid ${Colors.WhiteFAFAFA};
    border-top: none;
    overflow: hidden;

    transition: all 300ms ease;

    @media only screen and (min-width: 48rem) {
      padding: 0.5rem 1.5rem 0rem 1.5rem;
    }
  `,

  BottomDivider: styled.div<BorderProps>`
    width: 100%;
    height: 0.5rem;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    background: ${({ color }) => color};
    border: 0.125rem solid ${Colors.WhiteFAFAFA};
    border-top: none;
  `,
};

export default S;
