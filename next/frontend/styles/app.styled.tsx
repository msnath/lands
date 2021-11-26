import { css } from "styled-components";

export const padding = {
  hori: css`
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    @media only screen and (min-width: 768px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    @media only screen and (min-width: 64rem) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  `,
  vert: css`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    @media only screen and (min-width: 768px) {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    @media only screen and (min-width: 64rem) {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
  `,
  both: css`
    padding: 0.75rem;
    @media only screen and (min-width: 768px) {
      padding: 1rem;
    }
    @media only screen and (min-width: 64rem) {
      padding: 1.5rem;
    }
  `,
};

export const hover = css`
  transition: all 300ms ease;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-0.75rem);
    }
  }
`;

export const hoverp = css`
  transition: all 300ms ease;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-15%);
    }
  }
`;

export const boxshadow = css`
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

export const hoverdefault = css`
  transition: all 300ms ease;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-0.25rem);
      box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
    }
  }
`;

export const textoverflow = (lines: number) => css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
`;

export const Colors = {
  Blue: "#0088e9",
  BlueSemi: "#0088e980",
  BlueHover: "#1FA2FF",
  BlueLight: "#47b3ff",
  BlueLighter: "#38A5F9",
  BlueLighterSemi: "#38A5F952",
  BlueDark: "#004273",
  Yellow: "#fdc830",

  Green96E4C3: "#96E4C3",
  Green56D39E: "#56D39E",
  RedFF4C4C: "#FF4C4C",
  RedFF7A7A: "#FF7A7A",

  WhiteFFFFFF: "#FFFFFF",
  WhiteFAFAFA: "#FAFAFA",
  WhiteF0F0F0: "#F0F0F0",

  GreyE5E5E5: "#E5E5E5",
  GreyDBDFE7: "#DBDFE7",
  GreyBCC5D3: "#BCC5D3",
  Grey8F8F90: "#8F8F90",
  Grey6C6C6D: "#6C6C6D",

  Black3B3B3C: "#3B3B3C",
  Black23272B: "#23272B",
};
