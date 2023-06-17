import ReactPortal from "../ReactPortal";
import Spinner from "../Spinner";
import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

import { Overlay } from "./styles";

export default function Loader({ isLoading }) {
  const { shouldRender, overlayRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={overlayRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
