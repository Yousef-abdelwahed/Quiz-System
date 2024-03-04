/** @format */
import QuestionsAdd from "@/Components/Instructor/Questions/QuestionsAdd";
import QuestionsList from "@/Components/Instructor/Questions/QuestionsList";
import { getQuestions } from "@/Redux/Featuers/Questions/GetAllQuestionsSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function Questions() {
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await dispatch(getQuestions());
    console.log(res);

    setData(res.payload.data);
  };
  useEffect(() => {
    getData();
  }, [dispatch]);
  return (
    <>
      <div className=" border-2 p-[20px] h-[100%]">
        <QuestionsAdd openModal={openModal} setOpenModal={setOpenModal} getData={getData}/>

        <div className="flex flex-col md:flex-row justify-between my-3">
          <h2 className="text-[20px] font-bold">{t("BankOfQuestions")}</h2>
          <button
            className="btn flex items-center border-2 border-[#0D1321] border-solid p-2 rounded-[10px] mt-2 md:mt-0"
            onClick={() => setOpenModal(true)}
          >
            <FaPlusCircle className="mx-3 text-[20px]" />
            {t("AddQuestion")}
          </button>
        </div>
        <QuestionsList {...{data,getData}} />
      </div>
    </>
  );
}
