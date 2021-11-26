import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled, { css } from "styled-components";

type ContainerProps = { visible: bool };

type LoadingProps = { loading: bool };

const S = {
  Container: styled.div<ContainerProps>`
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    bottom: 2rem;
    z-index: 100;
    transition: all 300ms ease;
    pointer-events: none;

    ${({ visible }) =>
      visible
        ? css`
            opacity: 1;
            bottom: 2rem;
          `
        : css`
            opacity: 0.5;
            bottom: -5rem;
          `};
  `,

  Loading: styled.div<LoadingProps>`
    width: max-content;
    height: max-content;
    max-width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    align-items: center;
    background: ${Colors.Black3B3B3C};
    border-radius: 0.5rem;
    margin: 0rem 0.5rem;

    ${(props) =>
      props.loading
        ? css`
            padding: 0.5rem 1.5rem;
          `
        : css`
            padding: 1rem 1.5rem;
          `};
  `,

  PuffLoader: styled.div`
    width: 2rem;
    height: 2rem;
    margin-top: 0.5rem;
  `,

  Message: styled.p`
    display: block;
    color: ${Colors.WhiteFFFFFF};
    width: 100%;
  `,
};

export default S;
