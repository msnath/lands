import styled, { css } from "styled-components";
import Image from "next/image";
import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";

type ProgressSegmentProps = { highlighted: bool; fraction: number };

type ProgressBarProps = { percentage: number };

const S = {
  FormNav: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1.5rem;
    row-gap: 1.5rem;
    padding: 1rem 1.5rem;

    @media only screen and (min-width: 48rem) {
      grid-template-columns: 1fr 1fr;
    }
  `,

  University: styled.div`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1.5rem;
    padding: 0.5rem;
    align-items: center;
    justify-content: center;
  `,

  LogoContainer: styled.div`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 0.75rem;
    border: 0.1875rem solid ${Colors.WhiteFAFAFA};
    overflow: hidden;
  `,

  Logo: styled(Image)`
    width: 3.75rem;
    height: 3.75rem;
  `,

  UniversityDetails: styled.div`
    display: grid;
    row-gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
  `,

  Title: styled.p`
    font-family: Montserrat;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
  `,

  Text: styled.p`
    font-family: Mulish;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-align: left;
  `,

  Progress: styled.div`
    border-radius: 1.25rem;
    background: ${Colors.WhiteFAFAFA};
    padding: 1.125rem 1.5rem;
  `,

  ProgressText: styled.p`
    font-family: Mulish;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-align: left;
  `,

  ProgressSegments: styled.div`
    display: flex;
    flex-direction: row;
  `,

  ProgressSegment: styled.div<ProgressSegmentProps>`
    width: ${(props) => css`calc(100% / ${props.fraction})`};
    height: 0.5rem;
    border-radius: 0.25rem;
    margin-top: 0.75rem;

    &:not(:nth-child(1)) {
      margin-left: 0.25rem;
    }
    &:not(:nth-last-child(1)) {
      margin-right: 0.25rem;
    }

    background: ${(props) =>
      props.highlighted ? Colors.BlueLight : Colors.WhiteF0F0F0};
  `,

  ProgressBar: styled.div<ProgressBarProps>`
    position: sticky;
    top: 0;
    z-index: 5;

    background: ${Colors.GreyDBDFE7};
    height: 0.25rem;
    width: 100%;
    max-width: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 0.25rem;
      ${({ percentage }) => css`
        width: calc(100% * ${percentage});
        max-width: 100%;
        background: ${Colors.BlueLight};
        transition: all 300ms ease;
      `};
    }
  `,

  PageNav: styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
    column-gap: 0.5rem;
    padding: 0.5rem;

    @media only screen and (min-width: 48rem) {
      column-gap: 1.5rem;
      padding: 0.75rem 1.5rem;
    }
  `,

  Arrow: styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    height: 1.5rem;

    border-radius: 0.75rem;
    border: 0.125rem solid ${Colors.WhiteFAFAFA};

    &:disabled {
      cursor: default;
      & * {
        stroke: ${Colors.GreyBCC5D3};
      }
    }

    @media only screen and (min-width: 48rem) {
      width: 2.75rem;
      height: 2.75rem;
    }
  `,

  PageContainer: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.5rem;
    align-items: center;

    width: 100%;
    max-width: 28rem;

    background: ${Colors.WhiteFAFAFA};
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;

    @media only screen and (min-width: 48rem) {
      column-gap: 1rem;
    }
  `,

  Page: styled.div`
    display: grid;
    grid-template-columns: auto;
    column-gap: 0.5rem;
    width: max-content;

    background: ${Colors.WhiteFFFFFF};
    border-radius: 0.75rem;
    padding: 0.5rem 0.5rem;

    & > p:nth-child(1) {
      color: ${Colors.Grey6C6C6D};
      font-family: Mulish;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-align: center;
    }
    & > p:nth-child(2) {
      color: ${Colors.Black3B3B3C};
      font-family: Montserrat;
      font-size: 1.125rem;
      font-weight: 600;
      text-align: center;
    }

    @media only screen and (min-width: 48rem) {
      grid-template-columns: auto auto;
      column-gap: 1rem;
      padding: 0.5rem 1rem;
    }
  `,

  PageName: styled.h1`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    & > p {
      color: ${Colors.Black3B3B3C};
      font-family: Montserrat;
      font-size: 1rem;
      font-weight: 600;
      text-align: left;
    }
  `,

  SectionNavContainer: styled.div`
    position: sticky;
    top: 0.25rem;
    z-index: 6;
    background: ${Colors.WhiteFFFFFF};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding: 0.5rem;

    border-top: 1rem solid ${Colors.WhiteFAFAFA};
    border-bottom: 0.125rem solid ${Colors.WhiteFAFAFA};
  `,

  SectionNav: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;

    width: 31.25rem;

    @media only screen and (min-width: 48rem) {
      grid-template-columns: auto 1fr auto;
    }

    & > p {
      grid-column: 1/4;

      color: ${Colors.GreyBCC5D3};
      font-family: Mulish;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-align: left;

      @media only screen and (min-width: 48rem) {
        grid-column: 1/2;
      }
    }
  `,

  Sections: styled.div`
    display: flex;
    flex-direction: row;
    max-width: 100%;
    overflow: hidden;

    & > * + * {
      margin: 0 0 0 0.5rem;
    }
  `,

  SectionButtons: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;

    width: max-content;
  `,
};

export default S;
