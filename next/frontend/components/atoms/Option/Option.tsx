import Image from "next/image";
import S from "./Option.styled";

export type OptionProps = {
  img?: string;
  imgWidth?: number;
  imgHeight?: number;
  text: string;
  checked?: boolean;
  hoverable?: boolean;
  isPlaceholder?: boolean;
  onClick?: () => void;
};

const Option: React.FC<OptionProps> = ({
  img,
  imgWidth,
  imgHeight,
  text,
  checked,
  hoverable,
  isPlaceholder,
  onClick,
}) => {
  return (
    <S.Option
      checked={checked ? 1 : 0}
      hoverable={hoverable ? 1 : 0}
      isPlaceholder={isPlaceholder ? 1 : 0}
      pointer={onClick ? 1 : 0}
      onClick={onClick}
    >
      {img && (
        <Image
          layout="fixed"
          src={decodeURIComponent(img ?? "")}
          width={imgWidth ?? 20}
          height={imgHeight ?? 20}
          alt="Option icon"
        />
      )}
      <p>{text}</p>
    </S.Option>
  );
};

export default Option;
