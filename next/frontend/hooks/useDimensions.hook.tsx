import React from "react";
import { useMediaQuery } from "react-responsive";

const useDimensions = () => {
  const [is320, setIs320] = React.useState(false);
  const [is480, setIs480] = React.useState(false);
  const [is768, setIs768] = React.useState(false);
  const [is1024, setIs1024] = React.useState(false);
  const [is1280, setIs1280] = React.useState(false);
  const [is1440, setIs1440] = React.useState(false);
  const [is1920, setIs1920] = React.useState(false);
  const [is2560, setIs2560] = React.useState(false);

  const is320Browser = useMediaQuery({ minWidth: 320 });
  const is480Browser = useMediaQuery({ minWidth: 480 });
  const is768Browser = useMediaQuery({ minWidth: 768 });
  const is1024Browser = useMediaQuery({ minWidth: 1024 });
  const is1280Browser = useMediaQuery({ minWidth: 1280 });
  const is1440Browser = useMediaQuery({ minWidth: 1440 });
  const is1920Browser = useMediaQuery({ minWidth: 1920 });
  const is2560Browser = useMediaQuery({ minWidth: 2560 });

  React.useEffect(() => {
    setIs320(is320Browser);
    setIs480(is480Browser);
    setIs768(is768Browser);
    setIs1024(is1024Browser);
    setIs1280(is1280Browser);
    setIs1440(is1440Browser);
    setIs1920(is1920Browser);
    setIs2560(is2560Browser);
  }, [
    is320Browser,
    is480Browser,
    is768Browser,
    is1024Browser,
    is1280Browser,
    is1440Browser,
    is1920Browser,
    is2560Browser,
  ]);

  return {
    is320,
    is480,
    is768,
    is1024,
    is1280,
    is1440,
    is1920,
    is2560,
  };
};

export default useDimensions;
