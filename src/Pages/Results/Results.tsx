import { LoadingSpinner } from "@/Components";
import { ResultsData } from "@/Redux/Featuers/Results/ResultSlice";
import UseActionGet from "@/Utils/Hooks/UseActionGet";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Results() {
  const [ResData, setResData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const AllResults = UseActionGet(ResultsData);
  const fetchData = async () => {
    setLoading(true);
    const data = await AllResults();
    setResData(data?.data);
    setLoading(false);
  };
  const arr: any = [];
  const ele = ResData?.map((ele, index) => {
    return arr?.push(ele?.quiz);
  });

  console.log(arr);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      
        <>
          <div className="p-5 rounded-lg   border-[#00000033] border-solid border-2">
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center  text-sm font-light dark:border-neutral-500">
                <caption className="py-3 text-lg font-semibold text-left  text-gray-900 bg-white">
                  {t("Completed Quizzes")}
                </caption>
                
                <thead className="border-b   font-semibold bg-[#0D1321] text-white">

                  <tr>
                    <th
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Title")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Group name")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("No.of persons in group")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Participants")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Date")}
                    </th>
                    <th
                      scope="col"
                      className="border-r col-span-2 px-2 py-2 dark:border-neutral-500"
                    >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? arr?.map((res: any, index: any) => (
                    <tr key={index} className="border-b dark:border-neutral-500 ">
                      <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                        {res?.title}
                      </td>
                      <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                        {res?.difficulty}
                      </td>
                      <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                        {res?.score_per_question}
                      </td>
                      <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                        20 participants
                      </td>
                      <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500 ">
                        {moment(res?.schadule).format("Do MMM YY")}
                      </td>
                      <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                        <Link to={"/dashboard/results-final"}>
                          <button
                            type="button"
                            className="text-black bg-[#C5D86D] font-bold rounded-full  px-5 py-1 text-center"
                          >
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )):(
                   Array.from({ length: 4 }).map((_, rowIndex) => (
  <tr key={rowIndex} className="border-b dark:border-neutral-500">
    {Array.from({ length: 6 }).map((_, cellIndex) => (
      <td key={cellIndex} role="status" className={`space-y-2.5 animate-pulse max-w-lg text-lg py-4 font-lg ${cellIndex === 5 ? 'bg-green-50' : ''}`}>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 m-auto"></div>
      </td>
    ))}
  </tr>
))
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      
    </>
  );
}
