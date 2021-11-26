import React from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import Backdrop, { useBackdrop } from "../Backdrop/Backdrop";
import Dropdown from "../Dropdown/Dropdown";
import S from "./PhoneNumber.styled";
import Option from "@/components/atoms/Option/Option";
import SvgElem, { SvgElems } from "../SvgElem/SvgElem";
import CountriesUtil from "@/utils/countries.util";
import { useDebounce, useLocalStorage } from "react-use";
import Input from "../Input/Input";

type PhoneNumberProps = {
  placeholder: string;
  onChange?: (val: string) => void;
};

const PhoneNumber: React.FC<PhoneNumberProps> = ({ placeholder, onChange }) => {
  const [search, setSearch] = React.useState("");
  const [flag, setFlag] = React.useState<string | undefined>();
  const [dialCode, setDialCode] = React.useState("");
  const [lsDialCode, setLsDialCode] = useLocalStorage("dialCode", "");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const onChangeDialCode = (flag: string, code: string) => {
    setFlag(flag);
    setDialCode(code);
    setLsDialCode(code);
  };

  const onChangePhoneNumber: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPhoneNumber(e.target.value ?? "");

  useDebounce(
    () =>
      onChange &&
      onChange(dialCode && phoneNumber ? dialCode + " " + phoneNumber : ""),
    500,
    [dialCode, phoneNumber]
  );

  const { focused, setFocused, props } = useBackdrop();

  React.useEffect(() => {
    const country = CountriesUtil.data.find((c) => c.dialCode === lsDialCode);
    if (country) {
      setFlag(CountriesUtil.flagURL(country.isoCode));
      setDialCode(country.dialCode);
      setLsDialCode(country.dialCode);
    }
  }, [lsDialCode, setLsDialCode]);

  const searchedCountries = CountriesUtil.data.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <S.Container>
      <Dropdown focused={focused} onChangeFocus={setFocused}>
        <S.Dropdown width={120}>
          <Option
            img={flag}
            imgWidth={20}
            imgHeight={15}
            text={dialCode || "-Prefix-"}
            isPlaceholder
          />
          <SvgElem svg={SvgElems.IconTriangleDown} />
        </S.Dropdown>
        <Backdrop {...props}>
          <S.Menu onClick={(e) => e.stopPropagation()}>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={setSearch}
            />
            <AutoSizer>
              {({ height, width }) => (
                <List
                  rowCount={searchedCountries.length}
                  width={width}
                  height={height - 50}
                  rowHeight={44}
                  rowRenderer={({ index, key, style }) => {
                    const c = searchedCountries[index];
                    return (
                      <S.OptionButton
                        key={key}
                        style={style}
                        onClick={() => {
                          setFocused(false);
                          onChangeDialCode(
                            CountriesUtil.flagURL(c.isoCode),
                            c.dialCode
                          );
                        }}
                      >
                        <Option
                          hoverable
                          img={CountriesUtil.flagURL(c.isoCode)}
                          imgWidth={20}
                          imgHeight={15}
                          text={c.name + " " + c.dialCode}
                          checked={c.dialCode === dialCode}
                        />
                      </S.OptionButton>
                    );
                  }}
                />
              )}
            </AutoSizer>
          </S.Menu>
        </Backdrop>
      </Dropdown>

      <S.Input
        required
        type="tel"
        name="phone-number"
        placeholder={placeholder}
        value={phoneNumber}
        onChange={onChangePhoneNumber}
      />
    </S.Container>
  );
};

export default PhoneNumber;
