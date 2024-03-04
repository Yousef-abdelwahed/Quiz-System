
import { Modal } from "flowbite-react";


interface IProps {
  openModalDelete: any
  setOpenViewModal: any
  textBtn: any
  children: any
  modalTitle: any
  isLoading: any
  handleFunction: any
}

const ModalViewSection = ({
  openViewModal,
  setOpenViewModal,
  children,
  modalTitle,

}: IProps) => {
  return (
    <>
    <Modal
      show={openViewModal}
      onClose={() => setOpenViewModal(false)}
      size="lg"
      popup
    >
      <Modal.Header className="p-4 capitalize">{modalTitle}</Modal.Header>
      <Modal.Body>
        {children}
     
      </Modal.Body>
    </Modal>
    </>
  );
};

export default ModalViewSection;


