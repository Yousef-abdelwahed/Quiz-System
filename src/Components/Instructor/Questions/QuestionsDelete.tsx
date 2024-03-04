import { deleteQuestion } from "@/Redux/Featuers/Questions/DeleteQuestionsSlice";
import { getQuestions } from "@/Redux/Featuers/Questions/GetAllQuestionsSlice";
import { Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function QuestionsDelete({
  openModalDelete,
  setOpenModalDelete,
  id,
  getData
}:any) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteQuestion(id)).then(() => {
      setOpenModalDelete(false);
      toast.success(t("QuestionDeletedSuccessfully"));
      getData()
    });
  };

  return (
    <>
      <Modal
        dismissible
        show={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <Modal.Header>
          <h2>{t("SetUpAnewQuestion")}</h2>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <p>
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
          <button
            className=" my-4 d-block m-auto hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
