import styled, { css } from "styled-components";

type DividerProps = { width?: number; height?: number };

const Divider = styled.div<DividerProps>`
  ${(props) => css`
    display: block;
    pointer-events: none;
    width: ${props.width ?? 0}rem;
    height: ${props.height ?? 0}rem;
  `}
`;

export default Divider;
