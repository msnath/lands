import React from "react";
import S, { DropdownModalContainerProps } from "./DropdownModal.styled";

export type DropdownModalProps = {} & DropdownModalContainerProps;

const DropdownModal: React.FC<DropdownModalProps> = ({
  width = 24,
  height = 24,
  maxWidthVw = 90,
  maxHeightVh = 75,
  children,
}) => {
  return (
    <S.ModalContainer
      width={width}
      height={height}
      maxWidthVw={maxWidthVw}
      maxHeightVh={maxHeightVh}
      onClick={(e) => e.stopPropagation()}
    >
      <S.Modal>{children}</S.Modal>
    </S.ModalContainer>
  );
};
export default DropdownModal;
