import S from "./Radio.styled";

export type RadioProps = {
  text: string;
  checked: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Radio: React.FC<RadioProps> = ({ text, checked, onClick }) => {
  return (
    <S.Button checked={checked ? 1 : 0} onClick={onClick}>
      <S.Checkmark />
      {text}
    </S.Button>
  );
};

export default Radio;
