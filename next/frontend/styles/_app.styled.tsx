import styled from "styled-components";
import dynamic from "next/dynamic";
const ReactTooltip = dynamic(() => import("react-tooltip"), { ssr: false });

const Tooltip = styled(ReactTooltip)`
  max-width: 20rem;
`;

const S = { Tooltip };

export default S;
