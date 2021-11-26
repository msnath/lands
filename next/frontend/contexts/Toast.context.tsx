import { LoadingState } from "@/components/atoms/Toast/Toast";
import React from "react";

export const useToastContextValue = () => {
  const [_visible, _setVisible] = React.useState(false);
  const [_state, _setState] =
    React.useState<LoadingState>("LOADING");
  const [_message, _setMessage] = React.useState("");

  const setToast = (state: LoadingState, message: string) => {
    _setState(state);
    _setMessage(message);

    if (state === "LOADING") {
      _setVisible(true);
    } else if (state === "SUCCESS" || state === "FAILURE") {
      _setVisible(true);
      setTimeout(() => {
        _setVisible(false);
        setTimeout(() => {
          _setState("LOADING");
          _setMessage("");
        }, 1000);
      }, 3000);
    }
  };

  return {
    visible: _visible,
    state: _state,
    message: _message,
    setToast,
  };
};

type TLoadingContext = {
  setToast: (state: LoadingState, message: string) => void;
};

const ToastContext = React.createContext<TLoadingContext>({
  setToast: () => {},
});

export default ToastContext;
