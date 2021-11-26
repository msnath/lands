import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import Option from "../Option/Option";
import SvgElem, { SvgElems } from "../SvgElem/SvgElem";
import S from "./DatePickerComponents.styled";

// Calendar Day Component
type CalendarDayProps = { day: 1 | 2 | 3 | 4 | 5 | 6 | 7 };

export const CalendarDay: React.FC<CalendarDayProps> = ({ day }) => {
  const getDayStr = (day: number): string =>
    day === 0 || day === 7
      ? "Su"
      : day === 1
      ? "Mo"
      : day === 2
      ? "Tu"
      : day === 3
      ? "We"
      : day === 4
      ? "Th"
      : day === 5
      ? "Fr"
      : day === 6
      ? "Sa"
      : "";

  return (
    <button disabled>
      <S.CalendarDay>
        <p>{getDayStr(day)}</p>
      </S.CalendarDay>
    </button>
  );
};

// Calendar Date Component
type CalendarDateProps = {
  date?: number;
  selected?: boolean;
  onClick?: () => void;
};

export const CalendarDate: React.FC<CalendarDateProps> = ({
  date,
  selected,
  onClick = () => {},
}) => {
  return (
    <button onClick={onClick}>
      <S.CalendarDate selected={selected ? 1 : 0} blank={!date ? 1 : 0}>
        <p>{date ?? 0}</p>
      </S.CalendarDate>
    </button>
  );
};

// Calendar Month Component
type CalendarMonthProps = {
  month: number;
  focused?: boolean;
  onFocus?: () => void;
  monthOnChange?: (i: number) => void;
};

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  onFocus = () => {},
  monthOnChange = () => {},
}) => {
  const [focused, setFocused] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const getMonthStr = (month: number): string => {
    return new Date(Date.UTC(2000, (month - 1) % 12)).toLocaleString("en-us", {
      month: "long",
    });
  };

  const months = [...new Array(12)].map((_, i) => getMonthStr(i + 1));

  React.useEffect(() => {
    const elem = menuRef.current;
    if (!elem) return;

    for (let m = 0; m < months.length; m++) {
      const item = elem.children.item(m);
      if (months[m] === getMonthStr(month) && item) item.scrollIntoView();
    }
  }, [focused, month, months]);

  const onToggle = () => setFocused((v) => !v);

  return (
    <Dropdown onChangeFocus={onToggle}>
      <S.DropdownHeader width={9} onClick={onFocus}>
        <p>{getMonthStr(month)}</p>
        <SvgElem svg={SvgElems.IconTriangleDown} />
      </S.DropdownHeader>

      <S.DropdownMenu ref={menuRef} width={9}>
        {months.map((m, i) => (
          <Option
            key={i}
            hoverable
            text={m}
            checked={getMonthStr(month) === m}
            onClick={() => monthOnChange(i)}
          />
        ))}
      </S.DropdownMenu>
    </Dropdown>
  );
};

// Calendar Year Component
type CalendarYearProps = {
  year: number;
  focused?: boolean;
  onFocus?: () => void;
  yearOnChange?: (i: number) => void;
};

export const CalendarYear: React.FC<CalendarYearProps> = ({
  year,
  onFocus = () => {},
  yearOnChange = () => {},
}) => {
  const [focused, setFocused] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const thisYear = new Date().getUTCFullYear();
  const yearsRange = thisYear - 1950;
  const years = [...new Array(yearsRange + 10)].map(
    (_, i) => thisYear + i - yearsRange
  );

  React.useEffect(() => {
    const elem = menuRef.current;
    if (!elem) return;

    for (let y = 0; y < years.length; y++) {
      const item = elem.children.item(y);
      if (years[y] === year && item) item.scrollIntoView(true);
    }
  }, [focused, year, years]);

  const onToggle = () => setFocused((v) => !v);

  return (
    <Dropdown onChangeFocus={onToggle}>
      <S.DropdownHeader width={7} onClick={onFocus}>
        <p>{year}</p>
        <SvgElem svg={SvgElems.IconTriangleDown} />
      </S.DropdownHeader>

      <S.DropdownMenu ref={menuRef} width={7}>
        {years.map((y, i) => (
          <Option
            key={i}
            hoverable
            text={y.toString()}
            checked={year === y}
            onClick={() => yearOnChange(y)}
          />
        ))}
      </S.DropdownMenu>
    </Dropdown>
  );
};
