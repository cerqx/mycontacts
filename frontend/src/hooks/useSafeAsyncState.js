import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import useIsMounted from "./useIsMounted";

export default function useSafeAsyncState(initialValue) {
  const [state, setState] = useState(initialValue);

  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback(
    (data) => {
      if (isMounted) {
        setState(data);
      }
    },
    [isMounted]
  );

  return [state, setSafeAsyncState];
}

useSafeAsyncState.propTypes = {
  initialValue: PropTypes.string.isRequired,
};
