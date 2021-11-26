import S from "./DatePicker.styled";
import React from "react";
import {
  CalendarMonth,
  CalendarYear,
  CalendarDay,
  CalendarDate,
} from "./DatePickerComponents";
import Dropdown from "../Dropdown/Dropdown";
import Backdrop, { useBackdrop } from "../Backdrop/Backdrop";
import { formatDate } from "@/helpers/date.helper";
import { SvgElems } from "../SvgElem/SvgElem";
import TextBox from "../TextBox/TextBox";

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [_date, _setDate] = React.useState(value ?? null);

  const _month = _date ? _date.getUTCMonth() : new Date().getUTCMonth();
  const _year = _date ? _date.getUTCFullYear() : new Date().getUTCFullYear();
  const _day = _date ? _date.getUTCDate() : new Date().getUTCDate();

  const [monthFocus, setMonthFocus] = React.useState(false);
  const [yearFocus, setYearFocus] = React.useState(false);

  const days = new Date(Date.UTC(_year, _month + 1, 0)).getUTCDate();
  const firstDay = new Date(Date.UTC(_year, _month, 1)).getUTCDay();

  const selectedDate = 1 <= _day && _day <= days ? _day : 1;

  const monthOnFocus = () => {
    setMonthFocus((prev) => !prev);
    setYearFocus(false);
  };
  const yearOnFocus = () => {
    setMonthFocus(false);
    setYearFocus((prev) => !prev);
  };

  const dateOnChange = (day: number) => {
    const newDate = new Date(Date.UTC(_year, _month, day));
    _setDate(newDate);
    if (onChange) onChange(newDate);
  };

  const monthOnChange = (month: number) => {
    const newDate = new Date(Date.UTC(_year, month, _day));
    _setDate(newDate);
    if (onChange) onChange(newDate);
  };

  const yearOnChange = (year: number) => {
    const newDate = new Date(Date.UTC(year, _month, _day));
    _setDate(newDate);
    if (onChange) onChange(newDate);
  };

  const { focused, setFocused, props } = useBackdrop();

  return (
    <S.Container>
      <Dropdown focused={focused} onChangeFocus={setFocused}>
        <TextBox
          pointer
          placeholder="-Select-"
          text={_date ? formatDate(_date) : ""}
          svg={SvgElems.IconCalendar}
        />

        <Backdrop {...props}>
          <S.DatePicker onClick={(e) => e.stopPropagation()}>
            <S.Header>
              <CalendarMonth
                month={_month + 1}
                focused={monthFocus}
                onFocus={monthOnFocus}
                monthOnChange={(i) => {
                  monthOnChange(i);
                  setMonthFocus(false);
                }}
              />
              <CalendarYear
                year={_year}
                focused={yearFocus}
                onFocus={yearOnFocus}
                yearOnChange={(i) => {
                  yearOnChange(i);
                  setYearFocus(false);
                }}
              />
            </S.Header>

            <S.Body>
              <CalendarDay day={1} />
              <CalendarDay day={2} />
              <CalendarDay day={3} />
              <CalendarDay day={4} />
              <CalendarDay day={5} />
              <CalendarDay day={6} />
              <CalendarDay day={7} />
              <br />
              {/* Loop to find the skipped days from Monday */}
              {/* First day (0=Sunday, 1=Monday) - 1 (to calculate difference from Monday) */}
              {[...new Array((firstDay - 1 + 7) % 7)].map((_, i) =>
                i + 1 === 0 ? (
                  <React.Fragment key={i}>
                    <CalendarDate />
                    <br />
                  </React.Fragment>
                ) : (
                  <CalendarDate key={i} />
                )
              )}
              {/* Loop to display all the days of the month */}
              {/* Adds i with the initial gap, then breaks to newline if it is Sunday */}
              {[...new Array(days)].map((_, i) =>
                (firstDay + i) % 7 === 0 ? (
                  <React.Fragment key={i}>
                    <CalendarDate
                      date={i + 1}
                      selected={i === selectedDate - 1}
                      onClick={() => dateOnChange(i + 1)}
                    />
                    <br />
                  </React.Fragment>
                ) : (
                  <CalendarDate
                    key={i}
                    date={i + 1}
                    selected={i === selectedDate - 1}
                    onClick={() => dateOnChange(i + 1)}
                  />
                )
              )}
            </S.Body>
          </S.DatePicker>
        </Backdrop>
      </Dropdown>
    </S.Container>
  );
};

export default DatePicker;
