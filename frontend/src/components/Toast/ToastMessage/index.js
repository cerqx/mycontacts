import PropTypes from "prop-types";
import { Container } from "./styles";
import checkCircle from "../../../assets/images/icons/checkCircle.svg";
import xCircle from "../../../assets/images/icons/xCircle.svg";
import { useEffect, memo } from "react";

function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, message]);

  function removeMessage() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={removeMessage}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === "success" && <img src={checkCircle} alt="OK img" />}
      {message.type === "danger" && <img src={xCircle} alt="Not OK img" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,

  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["default", "success", "danger"]),
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
  }),

  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};

export default memo(ToastMessage);
