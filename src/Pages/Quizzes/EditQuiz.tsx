/** @format */

import { LoadingSpinner } from "@/Components";
import FormComponents from "@/Components/Instructor/FormInput";
import { getQuizzesData } from "@/Redux/Featuers/Groups/getDataSlice";
import { editQuizzes } from "@/Redux/Featuers/Quizzes/editQuizSlice";
import { getQuizById } from "@/Redux/Featuers/Quizzes/getQuizzeSlice";
import useCurrentUrl from "@/Utils/Hooks/useCurrentUrl";
import { Button } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const { FormInput, FormSelect, FormDate, FromSelectInput } = FormComponents;
const EditQuiz = (props) => {
  const { handleSubmit, register, setValue } = useForm();
  const [isChecked, setIsChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [quizzes, setQuizzes] = React.useState([]);

  const dispatch = useDispatch();
  const quizId = useCurrentUrl();
  const quizData = useSelector((state) => state.getQuizzeSlice.data);

  React.useEffect(() => {
    getAllQuizzes();
  }, []);
  const getAllQuizzes = React.useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(getQuizById(quizId));
      // @ts-ignore
      setQuizzes(element?.payload);

      // console.log(element.payload?.data);
    } catch (error) {
      console.error("Error get groups:", error);
      // setGroups([]);
      setValue("duration", quizData?.duration);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  //
  React.useEffect(() => {
    if (quizData) {
      const [datePart, timePart] = quizData?.schadule?.split("T");
      const timeFormat = timePart?.replace("Z", "");

      setValue("schadule", datePart);
      setValue("time", timeFormat);

      setValue("group", quizData?.group);
      setValue("title", quizData?.title);
      setValue("description", quizData?.description);

      setValue("duration", quizData?.duration);
      setValue("score_per_question", quizData?.score_per_question);
    }
  }, [quizData, setValue]);

  const submitData = (data) => {
    handleEdit(data);
  };
  const handleEdit = async (data) => {
    setLoading(true);

    try {
      const element = await dispatch(editQuizzes(quizId, data));
      // toast.success(element?.payload?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(groups);
  return (
    <>
      {loading && quizData?.length >= 0 ? (
        "loading"
      ) : (
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex items-center justify-center  bg-white p-2">
            {/* <div className="w-full md:w-1/2 p-12 bg-white border rounded-xl border-stone-400 text-slate-950"> */}
            <div className="  p-6 bg-white border rounded-xl border-stone-400 text-slate-950 text-lg mt-3">
              <h2 className="font-medium text-xl">Data Structures Quiz One</h2>
              <>
                {/* Date */}
                <FormDate register={register} />
                {/*title */}
                <div className="flex  leading-loose my-2 justify-between rounded-md border border-gray-300 w-80 m-2 text-xl">
                  <LabelFields title="title" />
                  <div className="bg-white w-1/3  border-white rounded-md pr-2 pe-2">
                    <input
                      {...register("title", {
                        required: "Enter your title",
                      })}
                      placeholder=""
                      type="text"
                      className={`bg-white border-white rounded-xl pr-2 w-full ps-2`}
                    />
                  </div>
                </div>
                {/* <EditTitle
                  {...register("title", {
                    required: "Enter your title",
                  })}
                /> */}
                {/*Duration  */}
                <FromSelectInput
                  label="Duration"
                  maxNum={15}
                  {...register("duration", {
                    required: "Enter your duration",
                  })}
                  // defaultValues={quizData?.duration || ""}
                />
                {/** score_per_question*/}
                <FromSelectInput
                  label="Score per question "
                  {...register("score_per_question", {
                    required: "Enter your score question",
                  })}
                  maxNum={15}
                />
                {/** group*/}
                <GroupNameSelection
                  register={register}
                  label={"group name"}
                  setLoading={setLoading}
                />

                {/**Description */}
                <div className="my-2  rounded-md border leading-loose  border-gray-300 w-80 m-2  ">
                  <div className="bg-orange-100 w-full  rounded-md border pl-5 border-orange-100 ">
                    Description
                  </div>
                  <textarea
                    className=" rounded-md w-full h-16 mt-2 px-3 py-2 text-base text-gray-700 placeholder-gray-600 focus:outline-none focus:border-slate-800"
                    placeholder="Description"
                    {...register("description")}
                    defaultValue={quizData?.description || ""}
                  />
                </div>
              </>

              <EditButton loading={loading} />
            </div>
          </div>
        </form>
      )}
    </>
  );
};
const EditTitle = ({ ...rest }) => {
  return (
    <div className="flex  leading-loose my-2 justify-between rounded-md border border-gray-300 w-80 m-2 text-xl">
      <LabelFields title="title" />
      <div className="bg-white w-1/3  border-white rounded-md pr-2 pe-2">
        <input
          {...rest}
          placeholder=""
          type="text"
          className={`bg-white border-white rounded-xl pr-2 w-full ps-2`}
        />
      </div>
    </div>
  );
};
const GroupNameSelection = ({ label, setLoading, register }) => {
  const [groups, setGroups] = React.useState([]);
  const dispatch = useDispatch();

  const getAllgroups = React.useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(getQuizzesData());
      // @ts-ignore
      setGroups(element.payload?.data);
      console.log(element);
    } catch (error) {
      console.error("Error get groups:", error);
      // setGroups([]);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  React.useEffect(() => {
    getAllgroups();
  }, []);
  return (
    <div className="flex leading-loose my-2 justify-between rounded-md border border-gray-300 w-80 m-2 text-xl">
      <LabelFields title={label} />

      <select
        className="bg-white   border-white rounded-md pr-2 pe-2 "
        {...register("group", {
          required: "Enter your group name",
        })}
      >
        {groups.map((group) => (
          <option key={group._id} value={group._id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
};
const LabelFields = ({ title }) => {
  return (
    <div className="bg-orange-100 w-2/3 rounded-sm border pl-5 border-orange-100 capitalize">
      {title}
    </div>
  );
};
const EditButton = ({ loading }) => {
  return (
    <div className="relative flex leading-loose py-2 ">
      <button
        disabled={loading}
        type="text"
        className={`modalBtn  m-auto w-1/2 border border-[#ddd] rounded-[2rem]  text-gray-100 	`}
      >
        <span className="text-center m-auto flex justify-center ">
          {loading ? (
            <span className="py-2">
              <TbFidgetSpinner className="animate-spin" />
            </span>
          ) : (
            <span>Edit</span>
          )}
        </span>
      </button>
    </div>
  );
};
export default EditQuiz;