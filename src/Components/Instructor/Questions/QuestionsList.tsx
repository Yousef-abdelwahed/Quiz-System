import { getQuestions } from "@/Redux/Featuers/Questions/GetAllQuestionsSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { useDispatch } from "react-redux";
import QuestionsDelete from "./QuestionsDelete";
import QuestionsEdit from "./QuestionsEdit";

export default function QuestionsList({data,getData}:any) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [getId, setGetId] = useState("");
  const [getAllData, setGetAllData] = useState([]);

  const { t, i18n } = useTranslation();

  const list = data?.map((question: any) => (
    <tr key={question._id} className="border-b dark:border-neutral-500 ">
      <td className="whitespace-nowrap border-r px-6  font-medium dark:border-neutral-500 ">
        {question?.title}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-2 font-medium dark:border-neutral-500">
        {question.description}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-2 font-medium dark:border-neutral-500">
        {question.difficulty}
      </td>
      {/* <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500">
        {question.difficulty}
      </td> */}
      <td className="whitespace-nowrap border-r px-6 py-2 dark:border-neutral-500 flex text-[30px] text-center text-[#FB7C19]">
        <TbEdit
          className=" cursor-pointer"
          onClick={() => {
            setOpenModalEdit(true);
            setGetAllData(question);
          }}
        />
        <RiDeleteBinLine
          className="ml-5 cursor-pointer"
          onClick={() => {
            setOpenModalDelete(true);
            setGetId(question._id);
          }}
        />
      </td>
    </tr>
  ));

  return (
    <>
      <div className="w-full m-auto">
        <QuestionsDelete
          openModalDelete={openModalDelete}
          setOpenModalDelete={setOpenModalDelete}
          id={getId}
          getData={getData}
        />
        <QuestionsEdit
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
          getAllData={getAllData}
          getData={getData}
        />
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border  text-sm font-light dark:border-neutral-500 text-center">
                <thead className="border-b font-medium bg-[#0D1321] text-white text-center ">
                  <tr>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      {t("QuestionTitle")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      {t("QuestionDesc")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      {t("QuestionDifficultyLevel")}
                    </th>
                    {/* <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      {t("Date")}
                    </th> */}
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      {t("Actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>{data?.length> 0 ? list :( Array.from({ length: 4 }).map((_, rowIndex) => (
  <tr key={rowIndex} className="border-b dark:border-neutral-500">
    {Array.from({ length: 4 }).map((_, cellIndex) => (
      <td key={cellIndex} role="status" className={`space-y-2.5 animate-pulse max-w-lg text-lg py-4 font-lg `}>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 m-auto"></div>
      </td>
    ))}
  </tr>)))}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
