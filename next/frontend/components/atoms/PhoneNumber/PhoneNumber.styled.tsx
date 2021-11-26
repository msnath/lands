import { Colors, boxshadow } from "@/styles/app.styled";
import styled from "styled-components";

type DropdownProps = { width?: number };

const S = {
  Container: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    width: 100%;
  `,

  Dropdown: styled.div<DropdownProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3rem;
    width: ${(props) => (props.width ? `${props.width}px` : `100%`)};

    background: ${Colors.WhiteFFFFFF};
    border-radius: 0.75rem;
    border: 2px solid ${Colors.WhiteF0F0F0};
    padding: 0.75rem;

    & div {
      color: ${Colors.Grey8F8F90};
    }
  `,

  Menu: styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: min(30rem, 90%);
    height: min(30rem, 90%);
    background: ${Colors.WhiteFFFFFF};
    border-radius: 0.625rem;
    z-index: 1;
    padding: 0.5rem;
    ${boxshadow};
  `,

  OptionButton: styled.button`
    & div {
      color: ${Colors.Grey8F8F90};
    }
  `,

  Input: styled.input`
    background: ${Colors.WhiteFFFFFF};

    color: ${Colors.Black3B3B3C};
    font-family: Mulish;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;

    border-radius: 0.75rem;
    border: 2px solid ${Colors.WhiteF0F0F0};
    padding: 0.75rem 1rem;
    width: 100%;

    &::placeholder {
      color: ${Colors.Grey8F8F90};
    }
  `,
};

export default S;
