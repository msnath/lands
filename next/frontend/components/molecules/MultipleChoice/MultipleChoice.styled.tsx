import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

const S = {
  Container: styled.div`
    width: 100%;
  `,

  Simple: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: max-content;
  `,

  Placeholder: styled.p`
    color: ${Colors.Grey8F8F90};
    font-size: 0.875rem;
    font-weight: 500;
    font-style: italic;
    text-align: left;
    margin-left: 0.25rem;
  `,

  Input: styled.div`
    background: ${Colors.WhiteFFFFFF};
    position: sticky;
    top: -0.5rem;
    margin-top: -0.5rem;
    z-index: 1;
  `,
};

export default S;
