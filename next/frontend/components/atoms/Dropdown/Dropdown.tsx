import React from "react";
import { useClickAway } from "react-use";

export type DropdownProps = {
  focused?: boolean;
  onChangeFocus?: (focused: boolean) => void;
  onReclickCollapse?: boolean;
  children: [JSX.Element, JSX.Element];
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Dropdown: React.FC<DropdownProps> = ({
  focused,
  onReclickCollapse,
  onChangeFocus = () => {},
  children,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [internalFocused, setInternalFocused] = React.useState(false);

  const isFocused = focused ?? internalFocused;

  const onToggleFocus = (value: boolean) => {
    setInternalFocused(value);
    onChangeFocus(value);
  };

  const onClickContainer = () =>
    onReclickCollapse && isFocused ? onToggleFocus(false) : onToggleFocus(true);

  useClickAway(ref, () => onToggleFocus(false));

  const _children = React.Children.toArray(children);
  if (_children.length === 2) {
    const Header = _children.length === 2 ? _children[0] : null;
    const Body = _children.length === 2 ? _children[1] : null;

    return (
      <div ref={ref} {...props}>
        <div onClick={onClickContainer}>{Header}</div>
        <div style={{ display: isFocused ? "block" : "none" }}>{Body}</div>
      </div>
    );
  } else {
    // 2 children required for [header, body]
    return null;
  }
};

export default Dropdown;
