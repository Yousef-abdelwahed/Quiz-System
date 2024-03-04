import { quizImg, userImage } from "@/Assets/Images";
import ModalViewSection from "@/Components/Shared/ModalSection/ModalViewSection";
import { getIncomingQuizzesData } from "@/Redux/Featuers/Quizzes/getIncomingQuizzes";
import { getTopFiveStudents } from "@/Redux/Featuers/Student/getTopFiveStudentsSlice";

import { getQuizById } from "@/Redux/Featuers/Quizzes/getQuizzeSlice";
import UseActionGet from "@/Utils/Hooks/UseActionGet";
import { Table } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LiaEyeSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../Styles/global.scss";
import { ViewDetails } from "../Students/Students";
function Home() {
  const { t, i18n } = useTranslation();
  const [fiveStudentsData, setFiveStudentsData] = useState([])
  const [fiveQuizzesData, setFiveQuizzesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const topFiveStudentsData = UseActionGet(getTopFiveStudents)
  const topFiveQuizzesData = UseActionGet(getIncomingQuizzesData)



  const handleQuizzesData = async () => {
    setIsLoading(true);
    await topFiveQuizzesData()
      .then((res) => {
        setFiveQuizzesData(res?.data)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleStudentsData = async () => {
    setIsLoading(true);
    await topFiveStudentsData()
      .then((res) => {
        setFiveStudentsData(res?.data)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleStudentsData()
    handleQuizzesData()
  }, [])


  const [hoveredCardId, setHoveredCardId] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="  border border-[#ddd] rounded-[10px]">
          <div className="flex justify-between p-4  ">
            <h3>{t("UpcomingQuizzes")}</h3>
            <Link to={"/dashboard/quiz"}>{t("QuizDirectory")}</Link>
          </div>
          <div className="cards-list px-4">
            {!isLoading && fiveStudentsData?.length && fiveQuizzesData?.length >= 0 ? fiveQuizzesData?.map(({ _id, title, difficulty, description, code, schadule, createdAt }) =>
              <div className="card my-2 border border-1 hover:bg-gray-100 border-[#ddd] rounded-[10px]  w-full flex " style={{
                transition: "background-color 0.5s ease-in-out",
              }} onMouseEnter={() => setHoveredCardId(_id)}
                onMouseLeave={() => setHoveredCardId(null)}>
                <div className="card-img w-44">
                  <img src={quizImg} alt="quizImg" className="w-full origin-left hover:rotate-2 hover:translate-x-1 hover:scale-95 hover:shadow-lg transition-all duration-500" />
                </div>
                <div className="card-des w-[100%]  p-3">
                  <h1 className="font-bold">
                    {title}
                  </h1>
                  <div className="text-[#777]">
                    <span>{moment(createdAt).format("Do MMM YY")}</span> | <span>{moment(schadule).format("HH:mmA")}</span>
                  </div>
                  <div className="flex justify-between">
                   
                    <h2>No. of student’s enrolled: 32</h2>
                    <div className="flex items-center gap-2 cursor-pointer studentIconCard">
                      <div>


                      </div>
                      <ViewQuizzesDetails id={_id}
                        rest={_id === hoveredCardId ? (<span>View</span>) : (<LiaEyeSolid size={25} className="text-gray-600" />)} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (Array(3).fill().map((_, index) => (
              <div key={index} className="flex w-full items-center cards-list ps-0 border border-[#ddd] rounded-[10px] py-0 my-1 overflow-hidden">
                <div className="card-img bg-orange-100 px-2 w-1/4">
                  <div className="animate-pulse w-full h-32"></div>
                </div>
                <div className="card-des w-full p-3">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
              </div>
            )))}

          </div>
        </div>
        <div className=" border border-[#ddd] rounded-[10px]"  >
          <div className="flex justify-between p-4  ">
            <h3>{t("Top5Students")} </h3>
            <Link to={"/dashboard/student"} >{t("AllStudents")} </Link>
          </div>


          {!isLoading && fiveQuizzesData?.length && fiveStudentsData?.length >= 0 ? fiveStudentsData?.map(({ _id, first_name, last_name, avg_score, group }) => <>
            <div key={_id} className="cards-list px-4" onMouseEnter={() => setHoveredCardId(_id)}
              onMouseLeave={() => setHoveredCardId(null)}>
              <div className="card my-2 border border-1 hover:bg-gray-100 border-[#ddd] rounded-[10px]  w-full flex " style={{
                transition: "background-color 0.5s ease-in-out",
              }} >
                <div className="card-img  w-24 ">
                  <img src={userImage} className="object-cover w-full origin-left  hover:rotate-2 hover:translate-x-1 hover:scale-95 hover:shadow-lg transition-all duration-500" alt="userImage" />
                </div>
                <div className="card-des w-[100%] flex items-center justify-between  p-3">
                  <div>
                    <h1 className="font-bold">
                      {first_name + " " + last_name}
                    </h1>
                    <div className="text-[#777]">
                      <span>Group: {group?.name}</span> | <span>Average Score: {avg_score === 0 ? 0.7 : Math.round(avg_score)}</span>
                    </div>
                  </div>
                  <div className="cursor-pointer studentIconCard">
                    <ViewDetails id={_id} rest={_id === hoveredCardId ? (<span>View</span>) : (<LiaEyeSolid size={25} className="text-gray-600" />)} />

                  </div>
                </div>
              </div>
            </div>

          </>
          ) : (Array(3).fill().map((_, index) => (
            <div key={index} className="flex w-full items-center cards-list ps-0 border border-[#ddd] rounded-[10px] py-0 my-2 overflow-hidden">
              <div className="card-img bg-blue-100 px-1 w-1/6">
                <div className="animate-pulse w-full h-25"></div>
              </div>
              <div className="card-des w-full p-3">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              </div>
            </div>
          )))}

        </div>
      </div>
    </>
  );
}
export const ViewQuizzesDetails = ({ id, rest }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [quizzesData, setQuizzesData] = React.useState([])
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const toggleModal = () => {
    setOpenViewModal(!openViewModal);
  };
  const dispatch = useDispatch();

  const handelView = React.useCallback(async () => {

    setIsLoading(true);
    try {
      const element = await dispatch(getQuizById(id));
      setQuizzesData(element?.payload)
      console.log(element?.payload)
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, id]);
  React.useEffect(() => {
    if (openViewModal) {
      handelView();
    }
  }, [openViewModal, handelView]);

  const headers = ['title', 'description', 'Status', 'schadule'];

  return (<>
    <div className="rounded-2xl  p-2" onClick={toggleModal} >
      <div className="p-2 inset-0 bg-gray-200 rounded-full shadow-md">

        {rest}
      </div>
    </div>
    <ModalViewSection openViewModal={openViewModal}
      setOpenViewModal={setOpenViewModal}
      toggleModal={toggleModal}
      modalTitle="Upcoming quizzes">
      <div className="relative overflow-x-auto">
        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headers.map((header, index) => (
              <tr key={index}>

                <th className="px-4 py-2 text-left  border-2">{isLoading ? (<div className="h-3 border-2 bg-gray-200 rounded-full dark:bg-gray-700  w-1/2 mb-2.5"></div>
                ) : header}</th>


                <td className="border px-4 py-2">
                  {isLoading ? (
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2.5"></div>
                  ) : (
                    <p>
                      {header === 'title'
                        ? `${quizzesData?.title}`
                        : header === 'description'
                          ? quizzesData?.description
                          : header === 'schadule'
                            ? ` ${quizzesData?.schadule?.split("T")[0]} -- ${quizzesData?.schadule?.split("T")[1].split(".000Z")}`
                            : quizzesData?.status}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </thead>
        </Table>
      </div>
    </ModalViewSection>
  </>
  )
}
export default Home;