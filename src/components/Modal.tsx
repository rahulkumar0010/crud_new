import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

interface ModalProps {
  show: boolean;
  onHide: any;
  title: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ show, onHide, title, body }) => {
  const dispatch = useDispatch();
  return (
    <Modal show={show} onHide={()=>dispatch(onHide)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {/* {footer && <Modal.Footer>{footer}</Modal.Footer>} */}
    </Modal>
  );
};

export default CustomModal;
