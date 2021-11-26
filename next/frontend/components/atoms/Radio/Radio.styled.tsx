import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled, { css } from "styled-components";

const Checkmark = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: ${Colors.WhiteFFFFFF};
  border: 0.125rem solid ${Colors.GreyBCC5D3};
  border-radius: 50%;

  &::after {
    content: "";
    position: absolute;
    top: 0.025rem;
    left: 0.025rem;
    width: 0.8rem;
    height: 0.8rem;
    border: 0.2rem solid ${Colors.WhiteFFFFFF};
    border-radius: 50%;
  }
`;

type ButtonProps = { checked: bool };

const Button = styled.button<ButtonProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 0.5rem;
  align-items: center;
  text-align: left;
  padding: 0.5rem;

  color: var(--black-light);
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
      & > ${Checkmark} {
        background: ${Colors.Blue};
        border-color: ${Colors.Blue};
      }
    `}

  &:active > ${Checkmark} {
    background: ${Colors.BlueDark};
    border-color: ${Colors.BlueDark};
  }
`;

const S = { Checkmark, Button };

export default S;
