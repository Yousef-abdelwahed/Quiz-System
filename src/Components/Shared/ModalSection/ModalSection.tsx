/** @format */

import React, { Children } from "react";
import { Modal } from "flowbite-react";
import "../../../Styles/global.scss";
import { TbFidgetSpinner } from "react-icons/tb";

interface IProps {
  openModal: any
  setOpenModal: any
  design?: any
  textBtn: any
  children: any
  modalTitle: any
  isLoading: any
  handleSubmit: any
}


const ModalSection = ({
  openModal,
  setOpenModal,
  design,
  textBtn,
  children,
  modalTitle,
  isLoading,
  handleSubmit
}: IProps) => {
  // onClose={() => setOpenModal(false)}
  
  return (
    <Modal
      show={openModal}
      onClose={() => setOpenModal(false)}
      size="4xl"
      popup
      style={{background:"transparent"}}
    >
      <Modal.Header className="p-4 capitalize">{modalTitle}</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {children}
          <div className=" pt-5">
            {isLoading  ?
              <button
                disabled={isLoading}
                type="button"
                className={` ${design} modalBtn flex justify-center m-auto   w-1/4 p-2  space-y-6 border border-[#ddd] rounded-[2rem] px-5 text-gray-100   cursor-not-allowed `}>

                <TbFidgetSpinner className="animate-spin  " size={20} />
              </button>  : 
              <button
              onClick={() => setOpenModal(false)}

                type="submit"
                className={` ${design} block m-auto w-1/4 p-2 space-y-6 border border-[#ddd] rounded-[2rem] px-5 text-gray-100   `}
              >
                {textBtn}
              </button>}

          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSection;
