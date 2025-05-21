import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {ModalWrapper} from "./ModalComponent.style";

const ModalComponent = ({ isOpen, handleClose, children, modalWidth, modalHeight, hasStickyHeader=false }) => {
  if (!isOpen) return null;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      overflow="scroll"
    >
      <Fade in={isOpen}>
        <ModalWrapper modalWidth={modalWidth} modalHeight={modalHeight} hasStickyHeader={hasStickyHeader}>{children}</ModalWrapper>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
