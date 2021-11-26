import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

export type DropdownModalContainerProps = {
  width?: number;
  height?: number;
  maxWidthVw?: number;
  maxHeightVh?: number;
};

const S = {
  ModalContainer: styled.div<DropdownModalContainerProps>`
    background: ${Colors.WhiteFFFFFF};
    border-radius: 1.25rem;
    width: ${(props) => props.width}rem;
    height: ${(props) => props.height}rem;
    max-width: ${(props) => props.maxWidthVw}vw;
    max-height: ${(props) => props.maxHeightVh}vh;
    padding: 0.5rem;
  `,

  Modal: styled.div`
    height: 100%;
    max-height: 100%;
    padding: 0.5rem;
    overflow: auto;
  `,
};

export default S;
