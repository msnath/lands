import ToastContext from "@/contexts/Toast.context";
import React from "react";

const useToast = () => {
  return React.useContext(ToastContext);
};

export default useToast;
