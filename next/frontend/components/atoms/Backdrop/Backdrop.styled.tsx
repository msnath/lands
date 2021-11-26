import styled, { css } from "styled-components";

type BackdropProps = { use: boolean };

const Backdrop = styled.div<BackdropProps>`
  ${(props) =>
    props.use === true &&
    css`
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--black-light-semi);
      z-index: 10;

      & > * {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`;

const S = { Backdrop };

export default S;
