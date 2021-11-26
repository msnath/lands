import { bool } from "$/types/style.type";
import styled, { css } from "styled-components";

export type ColProps = { full_width: bool };

const S = {
  Row: styled.div`
    display: grid;
    grid-template-columns: 1fr;

    @media only screen and (min-width: 48rem) {
      grid-template-columns: 1fr 1fr;
      row-gap: 1.5rem;
      column-gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
  `,

  Col: styled.div<ColProps>`
    margin-bottom: 1.5rem;

    @media only screen and (min-width: 48rem) {
      margin-bottom: unset;
    }

    ${({ full_width }) =>
      full_width &&
      css`
        @media only screen and (min-width: 48rem) {
          grid-column: 1/3;
        }
      `}
  `,
};

export default S;
