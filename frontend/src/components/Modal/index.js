import { Container, Overlay, Footer } from "./styles";
import PropTypes from "prop-types";

import Button from "../Button";
import ReactPortal from "../ReactPortal";
import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

export default function Modal({
  danger,
  title,
  children,
  cancelLabel,
  isLoading,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
}) {
  const { shouldRender, overlayRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay onClick={onCancel} isLeaving={!visible} ref={overlayRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">{children}</div>

          <Footer>
            <button
              onClick={onCancel}
              type="button"
              className="cancelButton"
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              onClick={onConfirm}
              type="button"
              danger={danger}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar",
  isLoading: false,
};
