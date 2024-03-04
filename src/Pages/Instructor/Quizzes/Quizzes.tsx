/** @format */

import { BankIcon, allquizzes, quizIcon } from "@/Assets/Images";
// import useCurrentUrl from "@/Utils/Hooks/useCurrentUrl";
import { getIncomingQuizzesData } from "@/Redux/Featuers/Quizzes/getIncomingQuizzes";
import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SetNewQuizModal from "./QuizzesModal";
import "../../../Styles/global.scss";
import { MdOutlineClass } from "react-icons/md";
import { Table } from "flowbite-react";
import { getCompletedQuizzesData } from "@/Redux/Featuers/Quizzes/getCompletedQuizzes";
const Quizzes = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <div className="flex  w-full justify-between py-4">
        {/* */}
        {/* <div className=" "> */}

        <SetNewQuizModal
          toggleModal={toggleModal}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        {/* </div> */}

        <div className="flex w-1/3 justify-center ">
          {" "}
          <QuizzesBox toggleModal={toggleModal} />
        </div>
        <div className="w-full">
          <QuizzesCards />
          <CompletedQuizzes />
        </div>
      </div>
    </>
  );
};

export default Quizzes;

export const QuizzesBox = ({ toggleModal }) => {
  const navigate = useNavigate();

  const handleClick = (toUrl) => {
    console.log(toUrl);
    navigate(`/dashboard/${toUrl}`);
  };
  return (
    <div className="quizContainer flex flex-col  w-full  gap-y-px	py-2">
      <div
        onClick={toggleModal}
        className="flex flex-col items-center justify-center quizBox border-2 cursor-pointer   border-gry-200  text-center rounded-lg  me-4 p-4"
      >
        <div className=" ">
          <img
            src={quizIcon}
            className="m-auto my-2"
            alt="quiz icon for set up a new quiz"
          />
        </div>
        <div className="my-2 font-bold text-xl leading-tight capitalize">
          set up a new quiz
        </div>
      </div>
      <div
        className="flex my-2 flex-col items-center justify-center quizBox border-2 border-gry-200 text-center rounded-lg me-4 p-4 cursor-pointer"
        onClick={() => handleClick("questions")}
      >
        <div className="">
          <img
            src={BankIcon}
            className="m-auto my-1"
            alt="BankIcon icon for Question Bank"
          />
        </div>
        <div className="my-1 font-bold text-xl leading-tight capitalize">
          Question Bank
        </div>
      </div>
      <div
        className="flex my-1 flex-col items-center justify-center quizBox border-2 border-gry-200 text-center rounded-lg me-4 p-4 cursor-pointer"
        onClick={() => handleClick("student")}
      >
        <div className="">
          <MdOutlineClass fontSize={100} />
        </div>
        <div className="my-2 font-bold text-xl leading-tight capitalize">
          Student
        </div>
      </div>
    </div>
  );
};
export const QuizzesCards = () => {
  const [loading, setLoading] = React.useState(null);
  const [incomingQuizzes, setIncomingQuizzes] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getIncomingQuizzes = React.useCallback(async () => {
    setLoading(true);
    try {
      const element = await dispatch(getIncomingQuizzesData());
      setIncomingQuizzes(element.payload?.data);
      console.log(element.payload?.data);
    } catch (error) {
      console.error("Error get groups:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  React.useEffect(() => {
    // getAllQuizzes();
    getIncomingQuizzes();
  }, []);
  const moveToEdit = (quizId) => {
    navigate(`/dashboard/quiz/edit/${quizId}`, { state: { itemId: quizId } });
  };

  return (
    <>
      <div className="card my-2 border border-1 border-[#ddd] rounded-[10px] flex flex-col p-4">
        <h2 className="font-medium text-xl capitalize">Upcoming quizzes</h2>
        {!loading ? (
          incomingQuizzes?.slice(0, 2).map((item) => (
            <div className="flex items-center cards-list ps-0  border border-[#ddd]  rounded-[10px] py-0 my-1 overflow-hidden">
              <div className="card-img bg-orange-100 px-2">
                <img className="studentCarImg w-full" src={allquizzes} alt="" />
              </div>
              <div className="card-des w-full p-3">
                <h3 className="font-bold capitalize">{item.title}</h3>
                <div className="text-[#777]">
                  <span> {item?.schadule.}</span> | <span>09:00 AM</span>
                </div>
                <div className="flex justify-between items-center gap-2 cursor-pointer studentIconCard">
                  No. of student’s enrolled: {item?.participants}
                  <span>
                    <FaArrowAltCircleRight
                      className="text-black ms-auto "
                      onClick={() => moveToEdit(item?._id)}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center cards-list ps-0 border border-[#ddd] rounded-[10px] py-0 my-1 overflow-hidden">
            <div className="card-img bg-orange-100 px-2 w-1/4">
              {/* Placeholder for image */}
              <div className="animate-pulse w-full h-32"></div>
            </div>
            <div className="card-des w-full p-3">
              {/* Placeholder for title */}
              {/* Placeholder for date and time */}
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
          </div>
        )}
        {/* {incomingQuizzes?.length >= 0 &&
          incomingQuizzes?.slice(0, 2).map((item) => {
            return (
              <div className="flex items-center cards-list ps-0  border border-[#ddd]  rounded-[10px] py-0 my-1 overflow-hidden">
                <div className="card-img bg-orange-100 px-2">
                  <img
                    className="studentCarImg w-full"
                    src={allquizzes}
                    alt=""
                  />
                </div>
                <div className="card-des w-full p-3">
                  <h3 className="font-bold capitalize">{item.title}</h3>
                  <div className="text-[#777]">
                    <span>12 / 03 / 2023</span> | <span>09:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 cursor-pointer studentIconCard">
                    No. of student’s enrolled: 32
                    <span>
                      <FaArrowAltCircleRight
                        className="text-black ms-auto "
                        onClick={() => moveToEdit(item?._id)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            );
          })} */}
      </div>
    </>
  );
};
const CompletedQuizzes = () => {
  const [compQuizzes, setCompQuizzes] = React.useState();
  const [loading, setLoading] = React.useState(null);
  const dispatch = useDispatch();
  const getIncomingQuizzes = React.useCallback(async () => {
    setLoading(true);
    try {
      const element = await dispatch(getCompletedQuizzesData());
      setCompQuizzes(element.payload?.data);
    } catch (error) {
      console.error("Error get groups:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  React.useEffect(() => {
    // getAllQuizzes();
    getIncomingQuizzes();
  }, []);
  return (
    <>
      <section className=" w-full my-2 border border-1 border-[#ddd] rounded-[10px] flex flex-col p-4">
        <h2 className="py-3">Completed Quizzes</h2>

        <div className="overflow-x-auto">
          <Table className="border-separate border border-slate-400 ...">
            <Table.Head className="text-center text-white">
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                Title
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                Status
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                Enrolled
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                Schedule
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                Closed
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {compQuizzes?.length >= 0 ? (
                compQuizzes.map((item) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-50">
                    {/* Title Cell */}
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white border border-slate-300 ...">
                      {item?.title}
                    </Table.Cell>
                    {/* Status Cell */}
                    <Table.Cell className="border border-slate-300 ...">
                      {item?.status}
                    </Table.Cell>
                    {/* Enrolled Cell */}
                    <Table.Cell className="border border-slate-300 ...">
                      {item?.participants}
                    </Table.Cell>
                    {/* Schedule Cell */}
                    <Table.Cell className="border border-slate-300 ...">
                      {item?.schadule.split("T").join(" ").split(":00.000Z")}
                    </Table.Cell>
                    <Table.Cell className="border border-slate-300 ...">
                      {item?.closed_at.split("T")[0]}
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                // Skeleton for no data
                <>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white border border-slate-300 ...">
                    Loading...
                  </Table.Cell>
                  <Table.Cell className="border border-slate-300 ...">
                    Loading...
                  </Table.Cell>
                  <Table.Cell className="border border-slate-300 ...">
                    Loading...
                  </Table.Cell>
                  <Table.Cell className="border border-slate-300 ...">
                    Loading...
                  </Table.Cell>
                  <Table.Cell className="border border-slate-300 ...">
                    Loading...
                  </Table.Cell>
                </>
              )}
            </Table.Body>
          </Table>
        </div>
      </section>
    </>
  );
};
