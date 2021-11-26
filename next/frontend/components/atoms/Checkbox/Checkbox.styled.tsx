import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled, { css } from "styled-components";

type CheckboxProps = { checked: bool };

const Checkmark = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: ${Colors.WhiteFFFFFF};
  border: 0.125rem solid ${Colors.GreyBCC5D3};
  border-radius: 0.25rem;

  &::after {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: 0.4rem;
    width: 0.25rem;
    height: 0.5rem;
    border: solid ${Colors.WhiteFFFFFF};
    border-width: 0 0.15rem 0.15rem 0;
    transform: rotate(45deg);
  }
`;

const Button = styled.button<CheckboxProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 0.5rem;
  align-items: center;
  text-align: left;
  padding: 0.5rem;

  color: ${Colors.Black3B3B3C};
  font-size: 1rem;
  font-weight: 600;
  font-family: Mulish;

  @media (hover: hover) and (pointer: fine) {
    &:hover > ${Checkmark} {
      background: ${Colors.BlueLight};
      border-color: ${Colors.BlueLight};
    }
  }

  ${(props) =>
    props.checked &&
    css`
      & ${Checkmark} {
        background: ${Colors.Blue};
        border-color: ${Colors.Blue};
      }
    `}

  &:active > ${Checkmark} {
    background: ${Colors.BlueDark};
    border-color: ${Colors.BlueDark};
  }
`;

const S = { Button, Checkmark };

export default S;
