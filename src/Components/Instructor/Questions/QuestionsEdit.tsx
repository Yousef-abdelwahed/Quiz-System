import { getQuestions } from "@/Redux/Featuers/Questions/GetAllQuestionsSlice";
import { updateQuestions } from "@/Redux/Featuers/Questions/UpdateQuestionsSlice";
import { Button, Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function QuestionsEdit({
  openModalEdit,
  setOpenModalEdit,
  getAllData,
  getData
}:any) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  console.log(getAllData);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data) => {
    let options = {
      A: data.A,
      B: data.B,
      C: data.C,
      D: data.D,
    };
    data.options = options;
    delete data.A;
    delete data.B;
    delete data.C;
    delete data.D;
    dispatch(updateQuestions({ id: getAllData._id, data }))
      .then(() => {
        setOpenModalEdit(false);
        getData()
        toast.success(t("updatedCategoriesSuccessfully"));
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    setValue("title", getAllData.title);
    setValue("description", getAllData.description);
    setValue("options", getAllData.options);
    setValue("A", getAllData?.options?.A);
    setValue("B", getAllData?.options?.B);
    setValue("C", getAllData?.options?.C);
    setValue("D", getAllData?.options?.D);
    setValue("answer", getAllData?.answer);
    setValue("type", getAllData?.type);
  }, [
    getAllData?.answer,
    getAllData.description,
    getAllData.options,
    getAllData.title,
    getAllData?.type,
    setValue,
  ]);
  return (
    <>
      <Modal
        dismissible
        show={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <Modal.Header>
          <h2>Update Question</h2>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-screen-lg mx-auto"
          >
            <div className="flex flex-col my-3">
              <div className="flex-1 flex items-center border border-gray-300 rounded-md mb-3">
                <h3 className="p-3 bg-secondColor rounded-l-md">
                  {t("Title")}:
                </h3>
                <input
                  type="text"
                  className="flex-1 border-0 outline-none"
                  {...register("title", {
                    required: true,
                  })}
                />
              </div>
              {errors.title && errors.title.type === "required" && (
                <span className="text-danger">Title is required</span>
              )}
              <div className="flex-1 flex items-center border border-gray-300 rounded-md mb-3">
                <h3 className="p-3 bg-secondColor rounded-l-md">
                  {t("Description")}:
                </h3>
                <textarea
                  className="flex-1 border-0 outline-none"
                  rows={2}
                  {...register("description", {
                    required: true,
                  })}
                />
              </div>
              {errors.description && errors.description.type === "required" && (
                <span className="text-danger">Title is required</span>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 my-3">
              <div className="flex-1 flex items-center border border-gray-300 rounded-md mb-3 md:mb-0">
                <h3 className="p-3 bg-secondColor rounded-l-md">A:</h3>
                <input
                  type="text"
                  className="flex-1 border-0 outline-none"
                  {...register("A", {
                    required: true,
                  })}
                />
              </div>
              {errors.A && errors.A.type === "required" && (
                <span className="text-danger">A is required</span>
              )}
              <div className="flex-1 flex items-center border border-gray-300 rounded-md mb-3 md:mb-0">
                <h3 className="p-3 bg-secondColor rounded-l-md">B:</h3>
                <input
                  type="text"
                  className="flex-1 border-0 outline-none"
                  {...register("B", {
                    required: true,
                  })}
                />
              </div>
              {errors.B && errors.B.type === "required" && (
                <span className="text-danger">B is required</span>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 my-3">
              <div className="flex-1 flex items-center border border-gray-300 rounded-md mb-3 md:mb-0">
                <h3 className="p-3 bg-secondColor rounded-l-md">C:</h3>
                <input
                  type="text"
                  className="flex-1 border-0 outline-none"
                  {...register("C", {
                    required: true,
                  })}
                />
              </div>
              {errors.C && errors.C.type === "required" && (
                <span className="text-danger">C is required</span>
              )}
              <div className="flex-1 flex items-center border border-gray-300 rounded-md mb-3 md:mb-0">
                <h3 className="p-3 bg-secondColor rounded-l-md">D:</h3>
                <input
                  type="text"
                  className="flex-1 border-0 outline-none"
                  {...register("D", {
                    required: true,
                  })}
                />
              </div>
              {errors.D && errors.D.type === "required" && (
                <span className="text-danger">D is required</span>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-around gap-5 my-3">
              <div className="flex items-center border-[1px] border-[#ddd] border-solid rounded-[10px]">
                <h3 className="flex-shrink-0 p-3 bg-secondColor m-0 rounded-l-[10px]">
                  {t("RightAnswer")}:
                </h3>
                <input
                  type="text"
                  className="border-0 flex-1 h-[40px] outline-none"
                  {...register("answer", {
                    required: true,
                  })}
                />
              </div>
              {errors.answer && errors.answer.type === "required" && (
                <span className="text-danger">answer is required</span>
              )}
              <div className="flex items-center border-[1px] border-[#ddd] border-solid rounded-[10px]">
                <h3 className="flex-shrink-0 p-3 bg-secondColor m-0 rounded-l-[10px]">
                  {t("Categorytype")}:
                </h3>
                <select
                  className="border-0 flex-1 h-[40px] outline-none"
                  {...register("type", {
                    required: true,
                  })}
                >
                  {errors.type && errors.type.type === "required" && (
                    <span className="text-danger">type is required</span>
                  )}
                  <option value="FE">FE</option>
                  <option value="BE">BE</option>
                </select>
              </div>
            </div>
            <Button type="submit" color="gray" className="mx-auto">
              {t("Edit")}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
