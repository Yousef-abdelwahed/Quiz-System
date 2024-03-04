/** @format */

import React, { useRef } from "react";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import FormInput from "@/Components/Shared/FormInput/FormInput";

const ModalComponent = (modalData) => {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { modalTitle, labelName, labelPhone } = modalData.modalData; // Destructure modalData here

  return (
    <div className="">
      <Button
        className="ms-auto my-2 studentBtn"
        color="light"
        onClick={() => setOpenModal(true)}
      >
        <span className="spinIcon px-2 text-lg ">
          <FaCirclePlus />
        </span>
        <span className="text-lg">Add Student </span>
      </Button>
      <Modal
        show={openModal}
        size="3xl"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header className="p-4">{modalTitle}</Modal.Header>
        <Modal.Body>
          {/* <FormInput label={labelName} />

          <FormInput label={labelPhone} /> */}
          {/* <Button
            className="hover:text-black hover:bg-gray-200 bg-black text-white border-2 border-[#000] transition-colors duration-300 ms-auto"
            color=""
          >
            Submit
          </Button> */}
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default ModalComponent;
export const inputFiled = () => {};
