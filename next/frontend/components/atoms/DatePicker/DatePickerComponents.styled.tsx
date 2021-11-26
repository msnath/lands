import { bool } from "$/types/style.type";
import { Colors } from "@/styles/app.styled";
import styled from "styled-components";

type DropdownProps = { width: number };

type CalendarDayProps = { selected: bool; blank: bool };

const S = {
  CalendarDay: styled.div`
    width: 2.5rem;
    height: 2.5rem;
    color: ${Colors.Black3B3B3C};
    background: ${Colors.WhiteFFFFFF};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;

    & > p {
      font-size: 0.75rem;
      line-height: 1.125rem;
      font-weight: 700;
    }
  `,

  CalendarDate: styled.div<CalendarDayProps>`
    width: 2rem;
    height: 2rem;
    color: ${Colors.Black3B3B3C};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ selected }) =>
      selected ? Colors.Blue : Colors.WhiteFFFFFF};
    cursor: ${({ blank }) => (blank ? "default" : "pointer")};

    margin: 0.25rem;

    & > p {
      color: ${({ selected, blank }) =>
        selected || blank ? Colors.WhiteFFFFFF : Colors.Black3B3B3C};
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 0.875rem;
    }

    &:hover {
      background: ${({ selected, blank }) =>
        blank
          ? Colors.WhiteFFFFFF
          : selected
          ? Colors.BlueLight
          : Colors.GreyE5E5E5};
    }
  `,

  DropdownHeader: styled.button<DropdownProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: ${(props) => props.width}rem;
    border-radius: 0.75rem;
    border: 1px solid ${Colors.GreyBCC5D3};
    padding: 0.5rem 0.75rem;
  `,

  DropdownMenu: styled.div<DropdownProps>`
    position: absolute;
    display: grid;
    row-gap: 0.5rem;

    width: ${(props) => (props.width ? props.width + "rem" : "100%")};
    height: max-content;
    min-width: 5.75rem;
    max-width: 100%;
    max-height: 15rem;

    padding: 1rem 0rem;
    margin-top: 0.25rem;

    border-radius: 0.5rem;
    box-shadow: -0.25rem 0.25rem 1.25rem rgba(18, 18, 18, 0.15);
    background: ${Colors.WhiteFFFFFF};

    overflow: auto;
    z-index: 1;
  `,
};

export default S;
