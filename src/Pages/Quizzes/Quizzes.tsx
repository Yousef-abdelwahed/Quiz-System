/** @format */

import { BankIcon, allquizzes, quizIcon } from "@/Assets/Images";
import { getIncomingQuizzesData } from "@/Redux/Featuers/Quizzes/getIncomingQuizzes";
import React from "react";
import { FaArrowAltCircleRight, FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SetNewQuizModal from "./QuizzesModal";
import { MdOutlineClass } from "react-icons/md";
import { Table } from "flowbite-react";
import { getCompletedQuizzesData } from "@/Redux/Featuers/Quizzes/getCompletedQuizzes";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { ViewQuizzesDetails } from "../Home/Home";
import { LiaEyeSolid } from "react-icons/lia";
import "../../Styles/global.scss"
const Quizzes = () => {

  const role = localStorage.getItem("UserRole");
  const [openModal, setOpenModal] = React.useState(false);
const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <div className="flex  w-full justify-between py-4">
      <SetNewQuizModal
          role={role}
          toggleModal={toggleModal}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <div className="flex w-1/3 justify-center ">
          <QuizzesBox toggleModal={toggleModal} role={role}/>
        </div>
        <div className="w-full">
        {role == "Instructor" && (<> <QuizzesCards />
          <CompletedQuizzes />
         </>)} 
         
        </div>
      </div>
    </>
  );
};

export default Quizzes;

export const QuizzesBox = ({ toggleModal,role }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (toUrl) => {
    console.log(toUrl);
    navigate(`/dashboard/${toUrl}`);
  };
  return (
    <div className="quizContainer flex flex-col  w-full  gap-y-px	py-2">
      {role == "Instructor" ? (<>
        <div
        onClick={toggleModal}
        className="flex flex-col items-center justify-center quizBox border-2 cursor-pointer   border-gry-200  text-center rounded-lg  me-4 p-4"
      >
        <div className=" ">
          <img
            src={quizIcon}
            className="m-auto my-2 "
            alt="quiz icon for set up a new quiz"
          />
        </div>
        <div className="my-2 font-bold text-xl leading-tight capitalize">
          {t("SetUpAnewQuiz")}
        </div>
      </div>
      <div
        className="flex my-2 flex-col items-center justify-center quizBox border-2 border-gry-200 text-center rounded-lg me-4 p-4 cursor-pointer"
        onClick={() => handleClick("questions")}
      >
        <div className="">
          <img
            src={BankIcon}
            className="m-auto my-1 "
            alt="BankIcon icon for Question Bank"
          />
        </div>
        <div className="my-1 font-bold text-xl leading-tight capitalize">
          {t("QuestionBank")}
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
          {t("students")}
        </div>
      </div></>): 
      <>
          <div
            onClick={toggleModal}
            className="flex flex-col items-center justify-center quizBox border-2 cursor-pointer    border-gry-200  text-center rounded-lg  me-4 p-4"
          >
            <div className="">
              <img
                src={quizIcon}
                className="m-auto my-2 "
                alt="quiz icon for set up a new quiz "
              />
            </div>
            <div className="my-2 font-bold text-xl leading-tight capitalize">
              join quiz
            </div>
          </div>
        </>}
     
    </div>
  );
};
export const QuizzesCards = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(null);
  const [incomingQuizzes, setIncomingQuizzes] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getIncomingQuizzes = React.useCallback(async () => {
    setLoading(true);
    try {
      const element = await dispatch(getIncomingQuizzesData());
      setIncomingQuizzes(element.payload?.data);
      // console.log(element.payload?.data);
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
  const [hoveredCardId, setHoveredCardId] = React.useState(null);

  return (
    <>
      <div className="card my-2 border border-1 border-[#ddd] rounded-[10px] flex flex-col p-4">
        <h2 className="font-medium text-xl capitalize">{t("Upcomingquizzes")}</h2>
        {!loading ? (
          incomingQuizzes?.slice(0, 2).map((item) => (
            <div className="flex items-center cards-list ps-0  border border-[#ddd]  rounded-[10px] py-0 my-1 overflow-hidden hover:bg-gray-100" style={{
              transition: "background-color 0.5s ease-in-out",
            }} onMouseEnter={() => setHoveredCardId(_id)}
              onMouseLeave={() => setHoveredCardId(null)}>
              <div className="card-img  w-40 hover:bg-orange-100">
                <img className=" w-full bg-orange-100 origin-left hover:bg-gray-900 hover:rotate-1 hover:rounded-lg hover:translate-x-3 hover:scale-75 hover:shadow-lg transition-all duration-500" src={allquizzes} alt="" />
              </div>
              <div className="card-des w-full p-3">
                <h3 className="font-bold capitalize">{item?.title}</h3>
                <div className="text-[#777]">
                  <span>{moment(item?.createdAt).format("Do MMM YY")}</span> | <span>{moment(item?.schadule).format("HH:mmA")}</span>
                </div>
                <div className="flex justify-between items-center gap-2 cursor-pointer ">
                  No. of student’s enrolled: {item?.participants}
                  <span className="flex">
                    <div className="p-4 bg-gray-200 rounded-full shadow-md flex justify-center items-center studentIconCard">

                      <FaRegEdit
                        className="text-gray-600  hover:text-gray-900" size={20}
                        onClick={() => moveToEdit(item?._id)}
                      />
                    </div>


                    <ViewQuizzesDetails id={item._id} rest={item._id === hoveredCardId ? (<span>View</span>) : (<LiaEyeSolid size={25} className="text-gray-600 hover:text-gray-900" />)} />

                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center cards-list ps-0 border border-[#ddd] rounded-[10px] py-0 my-1 overflow-hidden">
            <div className="card-img bg-orange-100 px-2 w-1/4">
              <div className="animate-pulse w-full h-32"></div>
            </div>
            <div className="card-des w-full p-3">

              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
const CompletedQuizzes = () => {
  const { t } = useTranslation();
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
        <h2 className="py-3">{t("CompletedQuizzes")}</h2>

        <div className="overflow-x-auto">
          <Table className="border-separate border border-slate-400 ...">
            <Table.Head className="text-center text-white">
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                {t("title")}
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                {t("Status")}
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                {t("Enrolled")}
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                {t("Schedule")}
              </Table.HeadCell>
              <Table.HeadCell className=" bg-slate-800  px-2 font-semibold">
                {t("Closed")}
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {compQuizzes?.length >= 0 ? (
                compQuizzes?.map((item) => (
                  <>

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
                  </>
                ))
              ) : (
                // Skeleton 
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
