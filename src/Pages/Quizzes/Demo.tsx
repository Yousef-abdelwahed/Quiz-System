/** @format */
import { BankIcon, quizIcon } from "@/Assets/Images";
import {
  FormInput,
  FormDate,
  FormSelect,
  FormSelectCategories,
} from "@/Components/Instructor/FormInput";
import { getAllData } from "@/Redux/Featuers/Groups/getDataSlice";
// import useCurrentUrl from "@/Utils/Hooks/useCurrentUrl";
import { Button, Modal } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  return (
    <>
      <div className="flex">
        {/* */}
        <QuizzesBox />
        <div className=""></div>
      </div>
    </>
  );
};

export default Quizzes;

export const QuizzesBox = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="quizContainer flex   gap-y-px	 w-1/2">
      <SetNewQuizModal openModal={openModal} setOpenModal={setOpenModal} />
      <div
        onClick={toggleModal}
        className=" quizBox border-2 cursor-pointer  border-gry-200  text-center rounded-lg w-1/2 me-4 p-4"
      >
        <div className="">
          <img
            src={quizIcon}
            className="m-auto"
            alt="quiz icon for set up a new quiz"
          />
        </div>
        <div className="my-2 font-bold text-xl leading-tight ">
          set up a new quiz
        </div>
      </div>
      <div className=" quizBox border-2 border-gry-200 text-center w-1/2 rounded-lg p-4">
        <div className="">
          <img
            src={BankIcon}
            className="m-auto"
            alt="BankIcon icon for Question Bank"
          />
        </div>
        <div>Question Bank</div>
      </div>
    </div>
  );
};

export const SetNewQuizModal = ({ openModal, setOpenModal }) => {
  const [groupsData, setGroupsData] = React.useState(null);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const navigate = useNavigate();
  const handleClick = () => {
    navigate("quiz/edit");
  };

  const { handleSubmit, register } = useForm();
  const submitData = async (formData) => {
    alert(formData);
    try {
      console.log("Form data submitted:", formData);
      // Close the modal
      setOpenModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  // const currentUrl = useCurrentUrl();

  // const fetchData = useAction();
  // const fetchStudentData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await fetchData(getDataSlice(currentUrl));
  //     console.log(data);
  //     // setData(data.data);
  //   } catch (error) {
  //     console.error("Error fetching groups data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const getGroupData = React.useCallback(
  //   async (currentUrl) => {
  //     setIsLoading(true);
  //     try {
  //       const data = await dispatch(getAllData({ currentUrl }));
  //       setGroupsData(data);
  //       console.log(groupsData);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [dispatch]
  // );
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   // const currentUrl = "group";
  //   const getGroupData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await dispatch(getAllData());
  //       console.log(data);
  //       return setGroupsData(data);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getGroupData();
  // }, []);

  return (
    <>
      <Modal
        show={openModal}
        size="3xl"
        popup
        onClose={() => setOpenModal(false)}
        // initialFocus={emailInputRef}
      >
        <Modal.Header className="p-4 capitalize">
          set up a new quiz
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(submitData)} className="">
            <FormInput
              label={"title"}
              // classStyle=""
              {...register("title", { required: "Add Title" })}
            />
            <div className="flex justify-between w-100">
              <FormSelect
                label={"Duration (in minutes)"}
                maxNum={60}
                // classStyle=""
                {...register("duration", { required: "Add duration" })}
              />
              <FormSelect
                label={"No. of questions"}
                maxNum={10}
                // classStyle=""
                {...register("questions_number", {
                  required: "Add questions_number",
                })}
              />
              <FormSelect
                label={"score per question"}
                maxNum={5}
                // classStyle=""
                {...(register("score_per_question"),
                { required: "Add score_per_question" })}
              />
            </div>
            <FormInput
              label={"Description"}
              // classStyle=""
              {...register("description", { required: "Add description" })}
            />
            <FormDate
              label={"schedule"}
              // classStyle=""
              {...register("schadule", { required: "Add description" })}
            />
            <div className="flex justify-between w-100">
              <FormSelectCategories
                categories={["Entry", "medium", "advanced"]}
                label={"Difficulty level"}
                // classStyle=""
                {...register("difficulty", { required: "Add difficulty" })}
              />
              <FormSelectCategories
                label={"Category type"}
                // classStyle=""
                categories={["FE", "BE"]}
                {...register("type", { required: "Add type" })}
              />
              <FormSelectCategories
                label={"Group name"}
                // classStyle=""
                categories={["JSB"]}
                {...register("group", { required: "Add group" })}
              />
            </div>
            <Button
              className="my-4 hover:text-black hover:bg-gray-200 bg-black text-white border-2 border-[#000] transition-colors duration-300 ms-auto"
              color=""
              type="button"
              // onClick={AddQuiz}
            >
              Submits
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};



import React, { forwardRef } from "react";

const FormInput = forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="py-2">
      <label>{label}</label>
      <input ref={ref} {...rest} type="text" />
    </div>
  );
});

const FormSelect = forwardRef(({ label, options, ...rest }, ref) => {
  return (
    <div className="py-2">
      <label>{label}</label>
      <select ref={ref} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

const FormDate = forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="py-2">
      <label>{label}</label>
      <input ref={ref} {...rest} type="date" />
    </div>
  );
});

const FormSelectCategories = forwardRef(
  ({ label, categories, ...rest }, ref) => {
    return (
      <div className="py-2">
        <label>{label}</label>
        <select ref={ref} {...rest}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

const FormComponents = {
  FormInput,
  FormSelect,
  FormDate,
  FormSelectCategories,
};

export default FormComponents;
