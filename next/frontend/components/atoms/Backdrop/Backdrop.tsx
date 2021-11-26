import React from "react";
import S from "./Backdrop.styled";

export const useBackdrop = (use = true) => {
  const [focused, setFocused] = React.useState(false);

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (focused) setFocused(false);
  };

  return { focused, setFocused, props: { use, onClick } };
};

type BackdropProps = { use?: boolean } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ use = true, ...props }, ref) => (
    <S.Backdrop use={use} {...props} ref={ref} />
  )
);

Backdrop.displayName = "Backdrop";

export default Backdrop;
