
// SetNewQuizModal.jsx
import FormComponents from "@/Components/Instructor/FormInput";
import ModalSection from "@/Components/Shared/ModalSection/ModalSection";
import { getQuizzesData } from "@/Redux/Featuers/Groups/getDataSlice";
import { addQuizzesData } from "@/Redux/Featuers/Quizzes/addQuizzesSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "../Students/Students.scss";
import { ImPower } from "react-icons/im";

import { toast } from "react-toastify";
import { IoMdCopy } from "react-icons/io";
import { getAllJoinData } from "@/Redux/Featuers/Quizzes/joinQuizSlice";
const {
  FormInput,
  FormSelect,
  FormDate,
  FormSelectCategories,
  FormInputTextAria,
  FormSelectGroups,
} = FormComponents;

const SetNewQuizModal = ({ toggleModal, openModal, setOpenModal,role }) => {
  const [groups, setGroups] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(null);
  const [showCode, setShowCode] = React.useState(false);
  const [quizCode, setQuizCode] = React.useState(null);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm();

  const handleSubmitData = async (data) => {
    setIsLoading(true);
    try {
      const element = await dispatch(addQuizzesData(data));
      if (element?.payload?.data) {
        setShowCode(true);
        setQuizCode(element?.payload?.data?.data.code);
      } else {
        setOpenModal(true);
      }

      if (isSubmitSuccessful) {
        setOpenModal(openModal);
      }
      reset();
    } catch (error) {
      setIsLoading(false);
      setOpenModal(true);

    }
  };

  
  const getAllgroups = async () => {
    setIsLoading(true);
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const currentTimeModal = `${hours}:${minutes}`;
  
    try {
      const element = await dispatch(getQuizzesData());
      setGroups(element.payload?.data);
      setValue("schadule", currentDate);
      setValue("time", currentTimeModal);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error get groups:", error);

    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if(role === "Instructor"){

      getAllgroups();
    }
  }, []);
  const handelFormData = async (data) => {    
    console.log(data)
    const element = await dispatch(getAllJoinData(data));
     setOpenModal(openModal);
     if(element?.payload?.data?.message=="Student joined successfully"){
      toast.success(element?.payload?.data?.message)
      console.log(element?.payload?.data.data?.quiz)
      navigate(`/dashboard/quiz-questions/${element?.payload?.data.data?.quiz}`);
    }else{
      toast.error(element?.payload?.response?.data?.message)
    }
};

  return (
    <>
    {role ==="Instructor"? (
      <>
       {!showCode ? (
        <ModalSection
       
          design="modalBtn"
          textBtn="submit"
          handleSubmit={handleSubmit(handleSubmitData)}
          {...{isLoading,openModal,setOpenModal,toggleModal}}

        >
          <FormInput
            label="Title"
            // ref={titleRef}
            deign=""
            {...register("title", { required: "Enter your group name" })}
          />
          <div className="flex justify-between">
            <FormSelect
              label="Duration"
              //   ref={durationRef}
              maxNum={15}
              design="w-full"
              {...register("duration", { required: "Enter your group name" })}
            />
            <FormSelect
              label="questions"
              //   ref={questionsRef}
              maxNum={15}
              {...register("questions_number", {
                required: "Enter your group name",
              })}
            />
            <FormSelect
              label="Score"
              //   ref={scoreRef}
              maxNum={15}
              {...register("score_per_question", {
                required: "Enter your group name",
              })}
            />
          </div>
          <FormInput
            label="Description"
            // ref={descriptionRef}
            deign="p-4"
            {...register("description", {
              required: "Enter your group name",
            })}
          />
          <div className="py-1">
            <div className="flex  justify-between  rounded-xl border border-gray-300 w-7/12 2 m-2">
              <div className="flex items-center justify-between w-full">
                <div
                  className={`bg-orange-100 md:w-40 text-center  p-1 rounded-xl border pl-5 border-orange-100 font-medium ps-0 capitalize `}
                >
                  Schedule
                </div>
                <div className="mx-2 flex justify-betweenms-auto">
                  <input
                    //   ref={scheduleRef}
                    {...register("schadule", {
                      required: "Enter your group name",
                    })}
                    type="date"
                    className="bg-white border-white rounded-xl pr-2 me-3 h-full"
                    style={{ width: "auto" }}
                  />
                  <input
                    type="time"
                    //   ref={timeRef}
                    {...register("time", {
                      required: "Enter your group name",
                    })}
                    name="time"
                    style={{ marginRight: "10px", width: "auto" }}
                    className="bg-white border-white rounded-xl pr-2 h-full ms-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <FormSelectCategories
              label="Difficulty level"
              //   ref={difficultyRef}
              categories={["easy", "medium", "hard"]}
              {...register("difficulty", {
                required: "Enter your group name",
              })}
            />
            <FormSelectCategories
              label="Category type"
              //   ref={groupRef}
              categories={["FE", "BE"]}
              {...register("type", { required: "Enter your group name" })}
            />
          
            <div className="py-1">
              <div className="flex items-center text-sm justify-center rounded-xl border border-gray-300 tex-center m-2">
                <div
                  className={`bg-orange-100  w-full text-center overflow-hidden p-1 rounded-xl border pl-5 border-orange-100 font-medium ps-0 capitalize `}
                >
                  group
                </div>
                <select
                  className="m-auto text-center bg-white border-white rounded-xl pr-2 md:w-40 "
                  {...register("group", {
                    required: "Enter your group name",
                  })}
                >
                  {groups?.length >= 0 &&
                    groups?.map((group) => (
                      <option key={group?._id} value={group?._id}>
                        {group?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </ModalSection>
      ) : (
       
        <CopyModal
        showCode={showCode}
        setShowCode={setShowCode}
        toggleModal={toggleModal}
        handleSubmitData={handleSubmitData}
        quizCode={quizCode}
        setOpenModal={setOpenModal}
      />      )}
      </>
    ) :(<>
      <ModalSection
       openModal={openModal}
       setOpenModal={setOpenModal}
       toggleModal={toggleModal}
       isLoading={isLoading}
       design="modalBtn"
       textBtn="submit"
       handleSubmit={handleSubmit(handelFormData)}
      >
        <FormInput
          label="Code"
          deign="p-4"
          placeholder="Enter the Code"
          {...register("code", {
            required: "Enter The Received Code PLZ",
          })}
          />
        
      </ModalSection>
      </>)}

     
    </>
  );
};
const CopyModal = ({
  showCode,
  setShowCode,
  toggleModal,
  setOpenModal,
  handleSubmitData,
  quizCode,
}) => {
  const textRef = React.useRef(null);

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef?.current?.textContent;
      navigator.clipboard.writeText(textToCopy);
      toast.success(`Copy Code ${textToCopy}`);
      setShowCode(false);
      setOpenModal(false);
    } else {
      toast.error("Failed To Code");
    }
  };

  return (
    
    <ModalSection
      openModal={showCode}
      setOpenModal={setShowCode}
      toggleModal={toggleModal}
      design="modalBtn hidden"
      textBtn="close"
      // handleSubmit={handleSubmit(handleSubmitData)}
    >
      <div className="flex justify-center items-center flex-col py-2">
        <div className="codeIcon ">
          <ImPower
            className="bg-dark"
            style={{ fontSize: "4em", color: "yellow" }}
          />
        </div>
        <p className="capitalize font-bold text-lg mt-5 mb-4">
          Quiz was created successfully
        </p>

        <div
          className="flex  justify-between font-bold text-lg rounded-xl border border-gray-300 text-slate-800 "
          onClick={handleCopy}
        >
          <div className="flex items-center  w-80">
            <div
              className={`bg-orange-100 w-1/2 text-center text-xl font-bold p-3 rounded-xl border pl-5 border-orange-100  ps-0 capitalize `}
            >
              code:
            </div>
            <div className=" flex w-1/2 items-center font-bold  justify-between text-lg p-2">
              <p className="capitalize font-bold text-lg " ref={textRef}>
                {quizCode}
              </p>
              <p
                className="ms-auto "
                style={{ fontSize: "2em", color: "white" }}
              >
                <IoMdCopy style={{ color: "#172554" }} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalSection>
  );
};
export default SetNewQuizModal;
