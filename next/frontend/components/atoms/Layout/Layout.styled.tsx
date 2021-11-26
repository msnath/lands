import { Colors, padding } from "@/styles/app.styled";
import styled from "styled-components";

type CenteredProps = { maxWidth?: number; padding?: boolean };

const S = {
  Centered: styled.div<CenteredProps>`
    align-self: center;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    max-width: ${(props) => props.maxWidth ?? 1440}px;

    background: ${Colors.WhiteFFFFFF};

    ${(props) => props.padding && padding.both}
  `,
};

export default S;
